// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        (unknown)
// source: p2e/v1/p2e.proto

package p2epb

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type MerkleProofRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	UserId string `protobuf:"bytes,1,opt,name=user_id,json=userId,proto3" json:"user_id,omitempty"`
}

func (x *MerkleProofRequest) Reset() {
	*x = MerkleProofRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_p2e_v1_p2e_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MerkleProofRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MerkleProofRequest) ProtoMessage() {}

func (x *MerkleProofRequest) ProtoReflect() protoreflect.Message {
	mi := &file_p2e_v1_p2e_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MerkleProofRequest.ProtoReflect.Descriptor instead.
func (*MerkleProofRequest) Descriptor() ([]byte, []int) {
	return file_p2e_v1_p2e_proto_rawDescGZIP(), []int{0}
}

func (x *MerkleProofRequest) GetUserId() string {
	if x != nil {
		return x.UserId
	}
	return ""
}

type MerkleProofResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Proof []byte `protobuf:"bytes,1,opt,name=proof,proto3" json:"proof,omitempty"`
}

func (x *MerkleProofResponse) Reset() {
	*x = MerkleProofResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_p2e_v1_p2e_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MerkleProofResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MerkleProofResponse) ProtoMessage() {}

func (x *MerkleProofResponse) ProtoReflect() protoreflect.Message {
	mi := &file_p2e_v1_p2e_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MerkleProofResponse.ProtoReflect.Descriptor instead.
func (*MerkleProofResponse) Descriptor() ([]byte, []int) {
	return file_p2e_v1_p2e_proto_rawDescGZIP(), []int{1}
}

func (x *MerkleProofResponse) GetProof() []byte {
	if x != nil {
		return x.Proof
	}
	return nil
}

type AllSeasonsRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	NetworkId string `protobuf:"bytes,1,opt,name=network_id,json=networkId,proto3" json:"network_id,omitempty"`
}

func (x *AllSeasonsRequest) Reset() {
	*x = AllSeasonsRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_p2e_v1_p2e_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AllSeasonsRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AllSeasonsRequest) ProtoMessage() {}

func (x *AllSeasonsRequest) ProtoReflect() protoreflect.Message {
	mi := &file_p2e_v1_p2e_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AllSeasonsRequest.ProtoReflect.Descriptor instead.
func (*AllSeasonsRequest) Descriptor() ([]byte, []int) {
	return file_p2e_v1_p2e_proto_rawDescGZIP(), []int{2}
}

func (x *AllSeasonsRequest) GetNetworkId() string {
	if x != nil {
		return x.NetworkId
	}
	return ""
}

type SeasonWithoutPrize struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id       string `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	BossName string `protobuf:"bytes,2,opt,name=boss_name,json=bossName,proto3" json:"boss_name,omitempty"`
	BossHp   int32  `protobuf:"varint,3,opt,name=boss_hp,json=bossHp,proto3" json:"boss_hp,omitempty"`
}

func (x *SeasonWithoutPrize) Reset() {
	*x = SeasonWithoutPrize{}
	if protoimpl.UnsafeEnabled {
		mi := &file_p2e_v1_p2e_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SeasonWithoutPrize) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SeasonWithoutPrize) ProtoMessage() {}

func (x *SeasonWithoutPrize) ProtoReflect() protoreflect.Message {
	mi := &file_p2e_v1_p2e_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SeasonWithoutPrize.ProtoReflect.Descriptor instead.
func (*SeasonWithoutPrize) Descriptor() ([]byte, []int) {
	return file_p2e_v1_p2e_proto_rawDescGZIP(), []int{3}
}

func (x *SeasonWithoutPrize) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *SeasonWithoutPrize) GetBossName() string {
	if x != nil {
		return x.BossName
	}
	return ""
}

func (x *SeasonWithoutPrize) GetBossHp() int32 {
	if x != nil {
		return x.BossHp
	}
	return 0
}

type AllSeasonsResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Seasons []*SeasonWithoutPrize `protobuf:"bytes,1,rep,name=seasons,proto3" json:"seasons,omitempty"`
}

func (x *AllSeasonsResponse) Reset() {
	*x = AllSeasonsResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_p2e_v1_p2e_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AllSeasonsResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AllSeasonsResponse) ProtoMessage() {}

func (x *AllSeasonsResponse) ProtoReflect() protoreflect.Message {
	mi := &file_p2e_v1_p2e_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AllSeasonsResponse.ProtoReflect.Descriptor instead.
func (*AllSeasonsResponse) Descriptor() ([]byte, []int) {
	return file_p2e_v1_p2e_proto_rawDescGZIP(), []int{4}
}

func (x *AllSeasonsResponse) GetSeasons() []*SeasonWithoutPrize {
	if x != nil {
		return x.Seasons
	}
	return nil
}

type CurrentSeasonRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	NetworkId string `protobuf:"bytes,1,opt,name=network_id,json=networkId,proto3" json:"network_id,omitempty"`
}

func (x *CurrentSeasonRequest) Reset() {
	*x = CurrentSeasonRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_p2e_v1_p2e_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CurrentSeasonRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CurrentSeasonRequest) ProtoMessage() {}

func (x *CurrentSeasonRequest) ProtoReflect() protoreflect.Message {
	mi := &file_p2e_v1_p2e_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CurrentSeasonRequest.ProtoReflect.Descriptor instead.
func (*CurrentSeasonRequest) Descriptor() ([]byte, []int) {
	return file_p2e_v1_p2e_proto_rawDescGZIP(), []int{5}
}

func (x *CurrentSeasonRequest) GetNetworkId() string {
	if x != nil {
		return x.NetworkId
	}
	return ""
}

type CurrentSeasonResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id          string  `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Denom       string  `protobuf:"bytes,2,opt,name=denom,proto3" json:"denom,omitempty"`
	TotalPrize  int32   `protobuf:"varint,3,opt,name=total_prize,json=totalPrize,proto3" json:"total_prize,omitempty"`
	BossName    string  `protobuf:"bytes,4,opt,name=boss_name,json=bossName,proto3" json:"boss_name,omitempty"`
	BossHp      int32   `protobuf:"varint,5,opt,name=boss_hp,json=bossHp,proto3" json:"boss_hp,omitempty"`
	RemainingHp float32 `protobuf:"fixed32,6,opt,name=remaining_hp,json=remainingHp,proto3" json:"remaining_hp,omitempty"`
	BossImage   string  `protobuf:"bytes,7,opt,name=boss_image,json=bossImage,proto3" json:"boss_image,omitempty"`
	IsPre       bool    `protobuf:"varint,8,opt,name=isPre,proto3" json:"isPre,omitempty"`
}

func (x *CurrentSeasonResponse) Reset() {
	*x = CurrentSeasonResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_p2e_v1_p2e_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CurrentSeasonResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CurrentSeasonResponse) ProtoMessage() {}

func (x *CurrentSeasonResponse) ProtoReflect() protoreflect.Message {
	mi := &file_p2e_v1_p2e_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CurrentSeasonResponse.ProtoReflect.Descriptor instead.
func (*CurrentSeasonResponse) Descriptor() ([]byte, []int) {
	return file_p2e_v1_p2e_proto_rawDescGZIP(), []int{6}
}

func (x *CurrentSeasonResponse) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *CurrentSeasonResponse) GetDenom() string {
	if x != nil {
		return x.Denom
	}
	return ""
}

func (x *CurrentSeasonResponse) GetTotalPrize() int32 {
	if x != nil {
		return x.TotalPrize
	}
	return 0
}

func (x *CurrentSeasonResponse) GetBossName() string {
	if x != nil {
		return x.BossName
	}
	return ""
}

func (x *CurrentSeasonResponse) GetBossHp() int32 {
	if x != nil {
		return x.BossHp
	}
	return 0
}

func (x *CurrentSeasonResponse) GetRemainingHp() float32 {
	if x != nil {
		return x.RemainingHp
	}
	return 0
}

func (x *CurrentSeasonResponse) GetBossImage() string {
	if x != nil {
		return x.BossImage
	}
	return ""
}

func (x *CurrentSeasonResponse) GetIsPre() bool {
	if x != nil {
		return x.IsPre
	}
	return false
}

type UserRankRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	SeasonId  string `protobuf:"bytes,1,opt,name=season_id,json=seasonId,proto3" json:"season_id,omitempty"`
	UserId    string `protobuf:"bytes,2,opt,name=user_id,json=userId,proto3" json:"user_id,omitempty"`
	NetworkId string `protobuf:"bytes,3,opt,name=network_id,json=networkId,proto3" json:"network_id,omitempty"`
}

func (x *UserRankRequest) Reset() {
	*x = UserRankRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_p2e_v1_p2e_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UserRankRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UserRankRequest) ProtoMessage() {}

func (x *UserRankRequest) ProtoReflect() protoreflect.Message {
	mi := &file_p2e_v1_p2e_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UserRankRequest.ProtoReflect.Descriptor instead.
func (*UserRankRequest) Descriptor() ([]byte, []int) {
	return file_p2e_v1_p2e_proto_rawDescGZIP(), []int{7}
}

func (x *UserRankRequest) GetSeasonId() string {
	if x != nil {
		return x.SeasonId
	}
	return ""
}

func (x *UserRankRequest) GetUserId() string {
	if x != nil {
		return x.UserId
	}
	return ""
}

func (x *UserRankRequest) GetNetworkId() string {
	if x != nil {
		return x.NetworkId
	}
	return ""
}

type UserRankResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	UserScore  *UserScore `protobuf:"bytes,1,opt,name=user_score,json=userScore,proto3" json:"user_score,omitempty"`
	TotalUsers int32      `protobuf:"varint,2,opt,name=total_users,json=totalUsers,proto3" json:"total_users,omitempty"`
}

func (x *UserRankResponse) Reset() {
	*x = UserRankResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_p2e_v1_p2e_proto_msgTypes[8]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UserRankResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UserRankResponse) ProtoMessage() {}

func (x *UserRankResponse) ProtoReflect() protoreflect.Message {
	mi := &file_p2e_v1_p2e_proto_msgTypes[8]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UserRankResponse.ProtoReflect.Descriptor instead.
func (*UserRankResponse) Descriptor() ([]byte, []int) {
	return file_p2e_v1_p2e_proto_rawDescGZIP(), []int{8}
}

func (x *UserRankResponse) GetUserScore() *UserScore {
	if x != nil {
		return x.UserScore
	}
	return nil
}

func (x *UserRankResponse) GetTotalUsers() int32 {
	if x != nil {
		return x.TotalUsers
	}
	return 0
}

type LeaderboardRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	SeasonId  string `protobuf:"bytes,1,opt,name=season_id,json=seasonId,proto3" json:"season_id,omitempty"`
	Limit     int32  `protobuf:"varint,2,opt,name=limit,proto3" json:"limit,omitempty"`
	Offset    int32  `protobuf:"varint,3,opt,name=offset,proto3" json:"offset,omitempty"`
	NetworkId string `protobuf:"bytes,4,opt,name=network_id,json=networkId,proto3" json:"network_id,omitempty"`
}

func (x *LeaderboardRequest) Reset() {
	*x = LeaderboardRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_p2e_v1_p2e_proto_msgTypes[9]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *LeaderboardRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*LeaderboardRequest) ProtoMessage() {}

func (x *LeaderboardRequest) ProtoReflect() protoreflect.Message {
	mi := &file_p2e_v1_p2e_proto_msgTypes[9]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use LeaderboardRequest.ProtoReflect.Descriptor instead.
func (*LeaderboardRequest) Descriptor() ([]byte, []int) {
	return file_p2e_v1_p2e_proto_rawDescGZIP(), []int{9}
}

func (x *LeaderboardRequest) GetSeasonId() string {
	if x != nil {
		return x.SeasonId
	}
	return ""
}

func (x *LeaderboardRequest) GetLimit() int32 {
	if x != nil {
		return x.Limit
	}
	return 0
}

func (x *LeaderboardRequest) GetOffset() int32 {
	if x != nil {
		return x.Offset
	}
	return 0
}

func (x *LeaderboardRequest) GetNetworkId() string {
	if x != nil {
		return x.NetworkId
	}
	return ""
}

type UserScore struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Rank            int32  `protobuf:"varint,1,opt,name=rank,proto3" json:"rank,omitempty"`
	SnapshotRank    int32  `protobuf:"varint,2,opt,name=snapshot_rank,json=snapshotRank,proto3" json:"snapshot_rank,omitempty"`
	UserId          string `protobuf:"bytes,3,opt,name=user_id,json=userId,proto3" json:"user_id,omitempty"`
	InProgressScore int64  `protobuf:"varint,4,opt,name=in_progress_score,json=inProgressScore,proto3" json:"in_progress_score,omitempty"`
	SnapshotScore   int64  `protobuf:"varint,5,opt,name=snapshot_score,json=snapshotScore,proto3" json:"snapshot_score,omitempty"`
	SeasonId        string `protobuf:"bytes,6,opt,name=season_id,json=seasonId,proto3" json:"season_id,omitempty"`
}

func (x *UserScore) Reset() {
	*x = UserScore{}
	if protoimpl.UnsafeEnabled {
		mi := &file_p2e_v1_p2e_proto_msgTypes[10]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UserScore) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UserScore) ProtoMessage() {}

func (x *UserScore) ProtoReflect() protoreflect.Message {
	mi := &file_p2e_v1_p2e_proto_msgTypes[10]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UserScore.ProtoReflect.Descriptor instead.
func (*UserScore) Descriptor() ([]byte, []int) {
	return file_p2e_v1_p2e_proto_rawDescGZIP(), []int{10}
}

func (x *UserScore) GetRank() int32 {
	if x != nil {
		return x.Rank
	}
	return 0
}

func (x *UserScore) GetSnapshotRank() int32 {
	if x != nil {
		return x.SnapshotRank
	}
	return 0
}

func (x *UserScore) GetUserId() string {
	if x != nil {
		return x.UserId
	}
	return ""
}

func (x *UserScore) GetInProgressScore() int64 {
	if x != nil {
		return x.InProgressScore
	}
	return 0
}

func (x *UserScore) GetSnapshotScore() int64 {
	if x != nil {
		return x.SnapshotScore
	}
	return 0
}

func (x *UserScore) GetSeasonId() string {
	if x != nil {
		return x.SeasonId
	}
	return ""
}

type LeaderboardResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	UserScore *UserScore `protobuf:"bytes,1,opt,name=user_score,json=userScore,proto3" json:"user_score,omitempty"`
}

func (x *LeaderboardResponse) Reset() {
	*x = LeaderboardResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_p2e_v1_p2e_proto_msgTypes[11]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *LeaderboardResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*LeaderboardResponse) ProtoMessage() {}

func (x *LeaderboardResponse) ProtoReflect() protoreflect.Message {
	mi := &file_p2e_v1_p2e_proto_msgTypes[11]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use LeaderboardResponse.ProtoReflect.Descriptor instead.
func (*LeaderboardResponse) Descriptor() ([]byte, []int) {
	return file_p2e_v1_p2e_proto_rawDescGZIP(), []int{11}
}

func (x *LeaderboardResponse) GetUserScore() *UserScore {
	if x != nil {
		return x.UserScore
	}
	return nil
}

var File_p2e_v1_p2e_proto protoreflect.FileDescriptor

var file_p2e_v1_p2e_proto_rawDesc = []byte{
	0x0a, 0x10, 0x70, 0x32, 0x65, 0x2f, 0x76, 0x31, 0x2f, 0x70, 0x32, 0x65, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x12, 0x06, 0x70, 0x32, 0x65, 0x2e, 0x76, 0x31, 0x22, 0x2d, 0x0a, 0x12, 0x4d, 0x65,
	0x72, 0x6b, 0x6c, 0x65, 0x50, 0x72, 0x6f, 0x6f, 0x66, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74,
	0x12, 0x17, 0x0a, 0x07, 0x75, 0x73, 0x65, 0x72, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x06, 0x75, 0x73, 0x65, 0x72, 0x49, 0x64, 0x22, 0x2b, 0x0a, 0x13, 0x4d, 0x65, 0x72,
	0x6b, 0x6c, 0x65, 0x50, 0x72, 0x6f, 0x6f, 0x66, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65,
	0x12, 0x14, 0x0a, 0x05, 0x70, 0x72, 0x6f, 0x6f, 0x66, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0c, 0x52,
	0x05, 0x70, 0x72, 0x6f, 0x6f, 0x66, 0x22, 0x32, 0x0a, 0x11, 0x41, 0x6c, 0x6c, 0x53, 0x65, 0x61,
	0x73, 0x6f, 0x6e, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1d, 0x0a, 0x0a, 0x6e,
	0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x09, 0x6e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x49, 0x64, 0x22, 0x5a, 0x0a, 0x12, 0x53, 0x65,
	0x61, 0x73, 0x6f, 0x6e, 0x57, 0x69, 0x74, 0x68, 0x6f, 0x75, 0x74, 0x50, 0x72, 0x69, 0x7a, 0x65,
	0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69, 0x64,
	0x12, 0x1b, 0x0a, 0x09, 0x62, 0x6f, 0x73, 0x73, 0x5f, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x02, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x08, 0x62, 0x6f, 0x73, 0x73, 0x4e, 0x61, 0x6d, 0x65, 0x12, 0x17, 0x0a,
	0x07, 0x62, 0x6f, 0x73, 0x73, 0x5f, 0x68, 0x70, 0x18, 0x03, 0x20, 0x01, 0x28, 0x05, 0x52, 0x06,
	0x62, 0x6f, 0x73, 0x73, 0x48, 0x70, 0x22, 0x4a, 0x0a, 0x12, 0x41, 0x6c, 0x6c, 0x53, 0x65, 0x61,
	0x73, 0x6f, 0x6e, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x34, 0x0a, 0x07,
	0x73, 0x65, 0x61, 0x73, 0x6f, 0x6e, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x1a, 0x2e,
	0x70, 0x32, 0x65, 0x2e, 0x76, 0x31, 0x2e, 0x53, 0x65, 0x61, 0x73, 0x6f, 0x6e, 0x57, 0x69, 0x74,
	0x68, 0x6f, 0x75, 0x74, 0x50, 0x72, 0x69, 0x7a, 0x65, 0x52, 0x07, 0x73, 0x65, 0x61, 0x73, 0x6f,
	0x6e, 0x73, 0x22, 0x35, 0x0a, 0x14, 0x43, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x74, 0x53, 0x65, 0x61,
	0x73, 0x6f, 0x6e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1d, 0x0a, 0x0a, 0x6e, 0x65,
	0x74, 0x77, 0x6f, 0x72, 0x6b, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09,
	0x6e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x49, 0x64, 0x22, 0xec, 0x01, 0x0a, 0x15, 0x43, 0x75,
	0x72, 0x72, 0x65, 0x6e, 0x74, 0x53, 0x65, 0x61, 0x73, 0x6f, 0x6e, 0x52, 0x65, 0x73, 0x70, 0x6f,
	0x6e, 0x73, 0x65, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x02, 0x69, 0x64, 0x12, 0x14, 0x0a, 0x05, 0x64, 0x65, 0x6e, 0x6f, 0x6d, 0x18, 0x02, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x05, 0x64, 0x65, 0x6e, 0x6f, 0x6d, 0x12, 0x1f, 0x0a, 0x0b, 0x74, 0x6f, 0x74,
	0x61, 0x6c, 0x5f, 0x70, 0x72, 0x69, 0x7a, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x05, 0x52, 0x0a,
	0x74, 0x6f, 0x74, 0x61, 0x6c, 0x50, 0x72, 0x69, 0x7a, 0x65, 0x12, 0x1b, 0x0a, 0x09, 0x62, 0x6f,
	0x73, 0x73, 0x5f, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x62,
	0x6f, 0x73, 0x73, 0x4e, 0x61, 0x6d, 0x65, 0x12, 0x17, 0x0a, 0x07, 0x62, 0x6f, 0x73, 0x73, 0x5f,
	0x68, 0x70, 0x18, 0x05, 0x20, 0x01, 0x28, 0x05, 0x52, 0x06, 0x62, 0x6f, 0x73, 0x73, 0x48, 0x70,
	0x12, 0x21, 0x0a, 0x0c, 0x72, 0x65, 0x6d, 0x61, 0x69, 0x6e, 0x69, 0x6e, 0x67, 0x5f, 0x68, 0x70,
	0x18, 0x06, 0x20, 0x01, 0x28, 0x02, 0x52, 0x0b, 0x72, 0x65, 0x6d, 0x61, 0x69, 0x6e, 0x69, 0x6e,
	0x67, 0x48, 0x70, 0x12, 0x1d, 0x0a, 0x0a, 0x62, 0x6f, 0x73, 0x73, 0x5f, 0x69, 0x6d, 0x61, 0x67,
	0x65, 0x18, 0x07, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x62, 0x6f, 0x73, 0x73, 0x49, 0x6d, 0x61,
	0x67, 0x65, 0x12, 0x14, 0x0a, 0x05, 0x69, 0x73, 0x50, 0x72, 0x65, 0x18, 0x08, 0x20, 0x01, 0x28,
	0x08, 0x52, 0x05, 0x69, 0x73, 0x50, 0x72, 0x65, 0x22, 0x66, 0x0a, 0x0f, 0x55, 0x73, 0x65, 0x72,
	0x52, 0x61, 0x6e, 0x6b, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1b, 0x0a, 0x09, 0x73,
	0x65, 0x61, 0x73, 0x6f, 0x6e, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08,
	0x73, 0x65, 0x61, 0x73, 0x6f, 0x6e, 0x49, 0x64, 0x12, 0x17, 0x0a, 0x07, 0x75, 0x73, 0x65, 0x72,
	0x5f, 0x69, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x75, 0x73, 0x65, 0x72, 0x49,
	0x64, 0x12, 0x1d, 0x0a, 0x0a, 0x6e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x5f, 0x69, 0x64, 0x18,
	0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x6e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x49, 0x64,
	0x22, 0x65, 0x0a, 0x10, 0x55, 0x73, 0x65, 0x72, 0x52, 0x61, 0x6e, 0x6b, 0x52, 0x65, 0x73, 0x70,
	0x6f, 0x6e, 0x73, 0x65, 0x12, 0x30, 0x0a, 0x0a, 0x75, 0x73, 0x65, 0x72, 0x5f, 0x73, 0x63, 0x6f,
	0x72, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x11, 0x2e, 0x70, 0x32, 0x65, 0x2e, 0x76,
	0x31, 0x2e, 0x55, 0x73, 0x65, 0x72, 0x53, 0x63, 0x6f, 0x72, 0x65, 0x52, 0x09, 0x75, 0x73, 0x65,
	0x72, 0x53, 0x63, 0x6f, 0x72, 0x65, 0x12, 0x1f, 0x0a, 0x0b, 0x74, 0x6f, 0x74, 0x61, 0x6c, 0x5f,
	0x75, 0x73, 0x65, 0x72, 0x73, 0x18, 0x02, 0x20, 0x01, 0x28, 0x05, 0x52, 0x0a, 0x74, 0x6f, 0x74,
	0x61, 0x6c, 0x55, 0x73, 0x65, 0x72, 0x73, 0x22, 0x7e, 0x0a, 0x12, 0x4c, 0x65, 0x61, 0x64, 0x65,
	0x72, 0x62, 0x6f, 0x61, 0x72, 0x64, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1b, 0x0a,
	0x09, 0x73, 0x65, 0x61, 0x73, 0x6f, 0x6e, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x08, 0x73, 0x65, 0x61, 0x73, 0x6f, 0x6e, 0x49, 0x64, 0x12, 0x14, 0x0a, 0x05, 0x6c, 0x69,
	0x6d, 0x69, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x05, 0x52, 0x05, 0x6c, 0x69, 0x6d, 0x69, 0x74,
	0x12, 0x16, 0x0a, 0x06, 0x6f, 0x66, 0x66, 0x73, 0x65, 0x74, 0x18, 0x03, 0x20, 0x01, 0x28, 0x05,
	0x52, 0x06, 0x6f, 0x66, 0x66, 0x73, 0x65, 0x74, 0x12, 0x1d, 0x0a, 0x0a, 0x6e, 0x65, 0x74, 0x77,
	0x6f, 0x72, 0x6b, 0x5f, 0x69, 0x64, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x6e, 0x65,
	0x74, 0x77, 0x6f, 0x72, 0x6b, 0x49, 0x64, 0x22, 0xcd, 0x01, 0x0a, 0x09, 0x55, 0x73, 0x65, 0x72,
	0x53, 0x63, 0x6f, 0x72, 0x65, 0x12, 0x12, 0x0a, 0x04, 0x72, 0x61, 0x6e, 0x6b, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x05, 0x52, 0x04, 0x72, 0x61, 0x6e, 0x6b, 0x12, 0x23, 0x0a, 0x0d, 0x73, 0x6e, 0x61,
	0x70, 0x73, 0x68, 0x6f, 0x74, 0x5f, 0x72, 0x61, 0x6e, 0x6b, 0x18, 0x02, 0x20, 0x01, 0x28, 0x05,
	0x52, 0x0c, 0x73, 0x6e, 0x61, 0x70, 0x73, 0x68, 0x6f, 0x74, 0x52, 0x61, 0x6e, 0x6b, 0x12, 0x17,
	0x0a, 0x07, 0x75, 0x73, 0x65, 0x72, 0x5f, 0x69, 0x64, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x06, 0x75, 0x73, 0x65, 0x72, 0x49, 0x64, 0x12, 0x2a, 0x0a, 0x11, 0x69, 0x6e, 0x5f, 0x70, 0x72,
	0x6f, 0x67, 0x72, 0x65, 0x73, 0x73, 0x5f, 0x73, 0x63, 0x6f, 0x72, 0x65, 0x18, 0x04, 0x20, 0x01,
	0x28, 0x03, 0x52, 0x0f, 0x69, 0x6e, 0x50, 0x72, 0x6f, 0x67, 0x72, 0x65, 0x73, 0x73, 0x53, 0x63,
	0x6f, 0x72, 0x65, 0x12, 0x25, 0x0a, 0x0e, 0x73, 0x6e, 0x61, 0x70, 0x73, 0x68, 0x6f, 0x74, 0x5f,
	0x73, 0x63, 0x6f, 0x72, 0x65, 0x18, 0x05, 0x20, 0x01, 0x28, 0x03, 0x52, 0x0d, 0x73, 0x6e, 0x61,
	0x70, 0x73, 0x68, 0x6f, 0x74, 0x53, 0x63, 0x6f, 0x72, 0x65, 0x12, 0x1b, 0x0a, 0x09, 0x73, 0x65,
	0x61, 0x73, 0x6f, 0x6e, 0x5f, 0x69, 0x64, 0x18, 0x06, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x73,
	0x65, 0x61, 0x73, 0x6f, 0x6e, 0x49, 0x64, 0x22, 0x47, 0x0a, 0x13, 0x4c, 0x65, 0x61, 0x64, 0x65,
	0x72, 0x62, 0x6f, 0x61, 0x72, 0x64, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x30,
	0x0a, 0x0a, 0x75, 0x73, 0x65, 0x72, 0x5f, 0x73, 0x63, 0x6f, 0x72, 0x65, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x0b, 0x32, 0x11, 0x2e, 0x70, 0x32, 0x65, 0x2e, 0x76, 0x31, 0x2e, 0x55, 0x73, 0x65, 0x72,
	0x53, 0x63, 0x6f, 0x72, 0x65, 0x52, 0x09, 0x75, 0x73, 0x65, 0x72, 0x53, 0x63, 0x6f, 0x72, 0x65,
	0x32, 0xf0, 0x02, 0x0a, 0x0a, 0x50, 0x32, 0x65, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12,
	0x48, 0x0a, 0x0b, 0x4c, 0x65, 0x61, 0x64, 0x65, 0x72, 0x62, 0x6f, 0x61, 0x72, 0x64, 0x12, 0x1a,
	0x2e, 0x70, 0x32, 0x65, 0x2e, 0x76, 0x31, 0x2e, 0x4c, 0x65, 0x61, 0x64, 0x65, 0x72, 0x62, 0x6f,
	0x61, 0x72, 0x64, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1b, 0x2e, 0x70, 0x32, 0x65,
	0x2e, 0x76, 0x31, 0x2e, 0x4c, 0x65, 0x61, 0x64, 0x65, 0x72, 0x62, 0x6f, 0x61, 0x72, 0x64, 0x52,
	0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x30, 0x01, 0x12, 0x4c, 0x0a, 0x0d, 0x43, 0x75, 0x72,
	0x72, 0x65, 0x6e, 0x74, 0x53, 0x65, 0x61, 0x73, 0x6f, 0x6e, 0x12, 0x1c, 0x2e, 0x70, 0x32, 0x65,
	0x2e, 0x76, 0x31, 0x2e, 0x43, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x74, 0x53, 0x65, 0x61, 0x73, 0x6f,
	0x6e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1d, 0x2e, 0x70, 0x32, 0x65, 0x2e, 0x76,
	0x31, 0x2e, 0x43, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x74, 0x53, 0x65, 0x61, 0x73, 0x6f, 0x6e, 0x52,
	0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x3d, 0x0a, 0x08, 0x55, 0x73, 0x65, 0x72, 0x52,
	0x61, 0x6e, 0x6b, 0x12, 0x17, 0x2e, 0x70, 0x32, 0x65, 0x2e, 0x76, 0x31, 0x2e, 0x55, 0x73, 0x65,
	0x72, 0x52, 0x61, 0x6e, 0x6b, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x18, 0x2e, 0x70,
	0x32, 0x65, 0x2e, 0x76, 0x31, 0x2e, 0x55, 0x73, 0x65, 0x72, 0x52, 0x61, 0x6e, 0x6b, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x43, 0x0a, 0x0a, 0x41, 0x6c, 0x6c, 0x53, 0x65, 0x61,
	0x73, 0x6f, 0x6e, 0x73, 0x12, 0x19, 0x2e, 0x70, 0x32, 0x65, 0x2e, 0x76, 0x31, 0x2e, 0x41, 0x6c,
	0x6c, 0x53, 0x65, 0x61, 0x73, 0x6f, 0x6e, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a,
	0x1a, 0x2e, 0x70, 0x32, 0x65, 0x2e, 0x76, 0x31, 0x2e, 0x41, 0x6c, 0x6c, 0x53, 0x65, 0x61, 0x73,
	0x6f, 0x6e, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x46, 0x0a, 0x0b, 0x4d,
	0x65, 0x72, 0x6b, 0x6c, 0x65, 0x50, 0x72, 0x6f, 0x6f, 0x66, 0x12, 0x1a, 0x2e, 0x70, 0x32, 0x65,
	0x2e, 0x76, 0x31, 0x2e, 0x4d, 0x65, 0x72, 0x6b, 0x6c, 0x65, 0x50, 0x72, 0x6f, 0x6f, 0x66, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1b, 0x2e, 0x70, 0x32, 0x65, 0x2e, 0x76, 0x31, 0x2e,
	0x4d, 0x65, 0x72, 0x6b, 0x6c, 0x65, 0x50, 0x72, 0x6f, 0x6f, 0x66, 0x52, 0x65, 0x73, 0x70, 0x6f,
	0x6e, 0x73, 0x65, 0x42, 0x09, 0x5a, 0x07, 0x2e, 0x2f, 0x70, 0x32, 0x65, 0x70, 0x62, 0x62, 0x06,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_p2e_v1_p2e_proto_rawDescOnce sync.Once
	file_p2e_v1_p2e_proto_rawDescData = file_p2e_v1_p2e_proto_rawDesc
)

func file_p2e_v1_p2e_proto_rawDescGZIP() []byte {
	file_p2e_v1_p2e_proto_rawDescOnce.Do(func() {
		file_p2e_v1_p2e_proto_rawDescData = protoimpl.X.CompressGZIP(file_p2e_v1_p2e_proto_rawDescData)
	})
	return file_p2e_v1_p2e_proto_rawDescData
}

var file_p2e_v1_p2e_proto_msgTypes = make([]protoimpl.MessageInfo, 12)
var file_p2e_v1_p2e_proto_goTypes = []interface{}{
	(*MerkleProofRequest)(nil),    // 0: p2e.v1.MerkleProofRequest
	(*MerkleProofResponse)(nil),   // 1: p2e.v1.MerkleProofResponse
	(*AllSeasonsRequest)(nil),     // 2: p2e.v1.AllSeasonsRequest
	(*SeasonWithoutPrize)(nil),    // 3: p2e.v1.SeasonWithoutPrize
	(*AllSeasonsResponse)(nil),    // 4: p2e.v1.AllSeasonsResponse
	(*CurrentSeasonRequest)(nil),  // 5: p2e.v1.CurrentSeasonRequest
	(*CurrentSeasonResponse)(nil), // 6: p2e.v1.CurrentSeasonResponse
	(*UserRankRequest)(nil),       // 7: p2e.v1.UserRankRequest
	(*UserRankResponse)(nil),      // 8: p2e.v1.UserRankResponse
	(*LeaderboardRequest)(nil),    // 9: p2e.v1.LeaderboardRequest
	(*UserScore)(nil),             // 10: p2e.v1.UserScore
	(*LeaderboardResponse)(nil),   // 11: p2e.v1.LeaderboardResponse
}
var file_p2e_v1_p2e_proto_depIdxs = []int32{
	3,  // 0: p2e.v1.AllSeasonsResponse.seasons:type_name -> p2e.v1.SeasonWithoutPrize
	10, // 1: p2e.v1.UserRankResponse.user_score:type_name -> p2e.v1.UserScore
	10, // 2: p2e.v1.LeaderboardResponse.user_score:type_name -> p2e.v1.UserScore
	9,  // 3: p2e.v1.P2eService.Leaderboard:input_type -> p2e.v1.LeaderboardRequest
	5,  // 4: p2e.v1.P2eService.CurrentSeason:input_type -> p2e.v1.CurrentSeasonRequest
	7,  // 5: p2e.v1.P2eService.UserRank:input_type -> p2e.v1.UserRankRequest
	2,  // 6: p2e.v1.P2eService.AllSeasons:input_type -> p2e.v1.AllSeasonsRequest
	0,  // 7: p2e.v1.P2eService.MerkleProof:input_type -> p2e.v1.MerkleProofRequest
	11, // 8: p2e.v1.P2eService.Leaderboard:output_type -> p2e.v1.LeaderboardResponse
	6,  // 9: p2e.v1.P2eService.CurrentSeason:output_type -> p2e.v1.CurrentSeasonResponse
	8,  // 10: p2e.v1.P2eService.UserRank:output_type -> p2e.v1.UserRankResponse
	4,  // 11: p2e.v1.P2eService.AllSeasons:output_type -> p2e.v1.AllSeasonsResponse
	1,  // 12: p2e.v1.P2eService.MerkleProof:output_type -> p2e.v1.MerkleProofResponse
	8,  // [8:13] is the sub-list for method output_type
	3,  // [3:8] is the sub-list for method input_type
	3,  // [3:3] is the sub-list for extension type_name
	3,  // [3:3] is the sub-list for extension extendee
	0,  // [0:3] is the sub-list for field type_name
}

func init() { file_p2e_v1_p2e_proto_init() }
func file_p2e_v1_p2e_proto_init() {
	if File_p2e_v1_p2e_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_p2e_v1_p2e_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MerkleProofRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_p2e_v1_p2e_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MerkleProofResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_p2e_v1_p2e_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AllSeasonsRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_p2e_v1_p2e_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SeasonWithoutPrize); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_p2e_v1_p2e_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AllSeasonsResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_p2e_v1_p2e_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CurrentSeasonRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_p2e_v1_p2e_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CurrentSeasonResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_p2e_v1_p2e_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*UserRankRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_p2e_v1_p2e_proto_msgTypes[8].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*UserRankResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_p2e_v1_p2e_proto_msgTypes[9].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*LeaderboardRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_p2e_v1_p2e_proto_msgTypes[10].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*UserScore); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_p2e_v1_p2e_proto_msgTypes[11].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*LeaderboardResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_p2e_v1_p2e_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   12,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_p2e_v1_p2e_proto_goTypes,
		DependencyIndexes: file_p2e_v1_p2e_proto_depIdxs,
		MessageInfos:      file_p2e_v1_p2e_proto_msgTypes,
	}.Build()
	File_p2e_v1_p2e_proto = out.File
	file_p2e_v1_p2e_proto_rawDesc = nil
	file_p2e_v1_p2e_proto_goTypes = nil
	file_p2e_v1_p2e_proto_depIdxs = nil
}
