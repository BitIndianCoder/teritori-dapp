package WeshFramework

import (
	"context"
	"flag"
	"fmt"
	"net/http"

	// mrand "math/rand"

	"os"

	"berty.tech/weshnet"
	"berty.tech/weshnet/pkg/ipfsutil"
	ipfs_mobile "berty.tech/weshnet/pkg/ipfsutil/mobile"
	"berty.tech/weshnet/pkg/protocoltypes"

	// "github.com/cskr/pubsub"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	ds "github.com/ipfs/go-datastore"
	ds_sync "github.com/ipfs/go-datastore/sync"
	"github.com/peterbourgon/ff/v3"
	"go.uber.org/zap"
	"google.golang.org/grpc"

	// "moul.io/srand"

	"github.com/pkg/errors"
)

func Weshd() {
	fs := flag.NewFlagSet("weshd", flag.ContinueOnError)
	var (
		port = fs.Int("port", 4248, "port")
	)
	if err := ff.Parse(fs, os.Args[1:]); err != nil {
		panic(errors.Wrap(err, "failed to parse flags"))
	}

	logger, err := zap.NewDevelopment()
	if err != nil {
		panic(errors.Wrap(err, "failed to create logger"))
	}

	logger.Info("weshd", zap.Int("port", *port))

	grpcServer := grpc.NewServer()

	// rng := mrand.New(mrand.NewSource(srand.MustSecure())) // nolint:gosec // we need to use math/rand here, but it is seeded from crypto/rand
	// drivers := []tinder.IDriver{}

	// setup ipfs node
	dsync := ds_sync.MutexWrap(ds.NewMapDatastore())
	repo, err := ipfsutil.CreateMockedRepo(dsync)
	if err != nil {
		panic(errors.Wrap(err, "failed to create ipfs repo"))
	}

	mrepo := ipfs_mobile.NewRepoMobile("", repo)
	mnode, err := ipfsutil.NewIPFSMobile(context.Background(), mrepo, &ipfsutil.MobileOptions{})
	if err != nil {
		panic(errors.Wrap(err, "failed to create ipfs node"))
	}

	ipfsCoreAPI, err := ipfsutil.NewExtendedCoreAPIFromNode(mnode.IpfsNode)
	if err != nil {
		panic(errors.Wrap(err, "failed to create ipfs core api"))
	}

	svc, err := weshnet.NewService(weshnet.Opts{
		Logger:        logger,
		DatastoreDir:  weshnet.InMemoryDirectory,
		IpfsCoreAPI:   ipfsCoreAPI,
		RootDatastore: dsync,
	})
	if err != nil {
		panic(errors.Wrap(err, "failed to create weshnet server"))
	}
	defer svc.Close()

	protocoltypes.RegisterProtocolServiceServer(grpcServer, svc)
	wrappedServer := grpcweb.WrapServer(grpcServer,
	grpcweb.WithOriginFunc(func(string) bool { return true }), // @FIXME: this is very insecure
	grpcweb.WithWebsockets(true),
	)
	handler := func(resp http.ResponseWriter, req *http.Request) {
		resp.Header().Set("Access-Control-Allow-Origin", "*")
		resp.Header().Set("Access-Control-Allow-Headers", "*")
		logger.Debug(fmt.Sprintf("Request: %v", req))
		wrappedServer.ServeHTTP(resp, req)
	}

	httpServer := http.Server{
		Addr:    fmt.Sprintf("127.0.0.1:%d", *port),
		Handler: http.HandlerFunc(handler),
	}

	if err := httpServer.ListenAndServe(); err != nil {
		logger.Debug(fmt.Sprintf("Request: %v", err))
		panic(errors.Wrap(err, "failed to start http server"))
	}
}
 
 
