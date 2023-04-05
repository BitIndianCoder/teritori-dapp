package db

import (
	"database/sql"
	"fmt"
	"reflect"
	"strings"

	"github.com/jimsmart/schema"
	"github.com/streamingfast/logging"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

type CursorError struct {
	error
}

type Loader struct {
	*sql.DB

	database         string
	schema           string
	tables           map[string]map[string]reflect.Type
	tablePrimaryKeys map[string]string
	operations       map[uint64]*Operation
	OperationsCount  uint64

	logger *zap.Logger
	tracer logging.Tracer
}

func NewLoader(psqlDsn string, logger *zap.Logger, tracer logging.Tracer) (*Loader, error) {
	dsn, err := parseDSN(psqlDsn)
	if err != nil {
		return nil, fmt.Errorf("parse dsn: %w", err)
	}

	db, err := sql.Open("postgres", dsn.connString())
	if err != nil {
		return nil, fmt.Errorf("open db connection: %w", err)
	}

	return &Loader{
		DB:               db,
		database:         dsn.database,
		schema:           dsn.schema,
		tables:           map[string]map[string]reflect.Type{},
		tablePrimaryKeys: map[string]string{},
		logger:           logger,
		tracer:           tracer,
		operations:       map[uint64]*Operation{},
		OperationsCount:  0,
	}, nil
}

func (l *Loader) LoadTables() error {
	schemaTables, err := schema.Tables(l.DB)
	if err != nil {
		return fmt.Errorf("retrieving table and schema: %w", err)
	}
	seenCursorTable := false
	for schemaTableName, columns := range schemaTables {
		schemaName := schemaTableName[0]
		tableName := schemaTableName[1]
		l.logger.Debug("processing schema's table",
			zap.String("schema_name", schemaName),
			zap.String("table_name", tableName),
		)
		if schemaName != l.schema {
			continue
		}
		if tableName == "cursors" {
			if err := l.validateCursorTables(columns); err != nil {
				return fmt.Errorf("invalid cursors table: %w", err)
			}
			seenCursorTable = true
		}

		m := map[string]reflect.Type{}
		for _, f := range columns {
			m[f.Name()] = f.ScanType()

			// TODO: sql cannot detect type number, it found interface {} for type number so we force type for known fields
			// if f.DatabaseTypeName() == NUMERIC => type = number
			// fmt.Println(f.DatabaseTypeName(), f.Name())
		}
		l.tables[tableName] = m

		key, err := schema.PrimaryKey(l.DB, schemaName, tableName)
		if err != nil {
			return fmt.Errorf("get primary key: %w", err)
		}
		if len(key) > 0 {
			l.tablePrimaryKeys[tableName] = key[0]
		} else {
			l.tablePrimaryKeys[tableName] = "id"
		}
	}
	if !seenCursorTable {
		return &CursorError{fmt.Errorf("cursors table is not found")}
	}
	return nil
}

func (l *Loader) validateCursorTables(columns []*sql.ColumnType) error {
	if len(columns) != 5 {
		return &CursorError{fmt.Errorf("table requires 5 columns ('id', 'cursor', 'block_num', 'block_id', 'network')")}
	}
	columnsCheck := map[string]string{
		"block_num": "int64",
		"block_id":  "string",
		"cursor":    "string",
		"id":        "string",
		"network":   "string",
	}
	for _, f := range columns {
		columnName := f.Name()
		if _, found := columnsCheck[columnName]; !found {
			return &CursorError{fmt.Errorf("unexpected column %q in cursors table", columnName)}
		}
		expectedType := columnsCheck[columnName]
		actualType := f.ScanType().Kind().String()
		if expectedType != actualType {
			return &CursorError{fmt.Errorf("column %q has invalid type, expected %q has %q", columnName, expectedType, actualType)}
		}
		delete(columnsCheck, columnName)
	}
	if len(columnsCheck) != 0 {
		for k := range columnsCheck {
			return &CursorError{fmt.Errorf("missing column %q from cursors", k)}
		}
	}
	key, err := schema.PrimaryKey(l.DB, l.schema, "cursors")
	if err != nil {
		return &CursorError{fmt.Errorf("failed getting primary key: %w", err)}
	}
	if len(key) == 0 {
		return &CursorError{fmt.Errorf("primary key not found: %w", err)}
	}
	if key[0] != "id" {
		return &CursorError{fmt.Errorf("column 'id' should be primary key not %q", key[0])}
	}
	return nil
}

// GetIdentifier returns <database>/<schema> suitable for user presentation
func (l *Loader) GetIdentifier() string {
	return fmt.Sprintf("%s/%s", l.database, l.schema)
}

func (l *Loader) GetAvailableTablesInSchema() string {
	tables := make([]string, len(l.tablePrimaryKeys))
	i := 0
	for table := range l.tablePrimaryKeys {
		tables[i] = table
		i++
	}

	return strings.Join(tables, ", ")
}

func (l *Loader) HasTable(tableName string) bool {
	if _, found := l.tables[tableName]; found {
		return true
	}
	return false
}

func (l *Loader) MarshalLogObject(encoder zapcore.ObjectEncoder) error {
	//TODO implement me
	encoder.AddUint64("operations", uint64(l.OperationsCount))
	return nil
}
