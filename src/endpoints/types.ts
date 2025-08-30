import {
    Float64,
    Int32,
    Int64,
    Name,
    PublicKey,
    Struct,
    UInt32,
    UInt64,
    UInt8,
} from '@wharfkit/antelope'

import * as AtomicAssetsContract from '../contracts/atomicassets'

export enum OfferState {
    PENDING = 0,
    INVALID = 1,
    UNKNOWN = 2,
    ACCEPTED = 3,
    DECLINED = 4,
    CANCELLED = 5,
}

export enum LinkState {
    WAITING = 0,
    CREATED = 1,
    CANCELED = 2,
    CLAIMED = 3,
}

export enum AuctionState {
    WAITING = 0,
    LISTED = 1,
    CANCELED = 2,
    SOLD = 3,
    INVALID = 4,
}

export enum SaleState {
    WAITING = 0,
    LISTED = 1,
    CANCELED = 2,
    SOLD = 3,
    INVALID = 4,
}

export enum BuyofferState {
    PENDING = 0,
    DECLINED = 1,
    CANCELED = 2,
    ACCEPTED = 3,
    INVALID = 4,
}

export enum TemplateBuyofferState {
    LISTED = 0,
    CANCELED = 1,
    SOLD = 2,
    INVALID = 3,
}

@Struct.type('token')
export class Token extends Struct {
    @Struct.field(Name) declare token_contract: Name
    @Struct.field('string') declare token_symbol: string
    @Struct.field(UInt8) declare token_precision: UInt8
}

@Struct.type('token_amount')
export class TokenAmount extends Token {
    @Struct.field(UInt64) declare amount: UInt64
}

@Struct.type('trading_pair')
export class TradingPair extends Struct {
    @Struct.field('string') declare listing_symbol: string
    @Struct.field('string') declare settlement_symbol: string
    @Struct.field('string') declare delphi_pair_name: string
    @Struct.field('bool') declare invert_delphi_pair: boolean
}

@Struct.type('atomicassets_config')
export class AtomicAssetsConfig extends Struct {
    @Struct.field(Name) declare contract: Name
    @Struct.field('string') declare version: string
    @Struct.field(AtomicAssetsContract.Types.FORMAT, {array: true})
    declare collection_format: AtomicAssetsContract.Types.FORMAT[]
    @Struct.field(Token, {array: true}) declare supported_tokens: Token[]
}

@Struct.type('atomicmarket_config')
export class AtomicMarketConfig extends Struct {
    @Struct.field(Name) declare atomicassets_contract: Name
    @Struct.field(Name) declare atomicmarket_contract: Name
    @Struct.field(Name) declare delphioracle_contract: Name
    @Struct.field('string') declare version: string
    @Struct.field(Float64) declare maker_market_fee: Float64
    @Struct.field(Float64) declare taker_market_fee: Float64
    @Struct.field(UInt64) declare minimum_auction_duration: UInt64
    @Struct.field(UInt64) declare maximum_auction_duration: UInt64
    @Struct.field(Float64) declare minimum_bid_increase: Float64
    @Struct.field(UInt64) declare auction_reset_duration: UInt64
    @Struct.field(Token, {array: true}) declare supported_tokens: Token[]
    @Struct.field(TradingPair, {array: true}) declare supported_pairs: TradingPair[]
}

@Struct.type('atomictools_config')
export class AtomicToolsConfig extends Struct {
    @Struct.field(Name) declare atomicassets_contract: Name
    @Struct.field(Name) declare atomictools_contract: Name
    @Struct.field('string') declare version: string
}

@Struct.type('collection_object')
export class CollectionObject extends Struct {
    @Struct.field(Name, {optional: true}) declare contract: Name
    @Struct.field(Name) declare collection_name: Name
    @Struct.field(Name) declare author: Name
    @Struct.field('bool') declare allow_notify: boolean
    @Struct.field(Name, {array: true}) declare authorized_accounts: Name[]
    @Struct.field(Name, {array: true}) declare notify_accounts: Name[]
    @Struct.field(Float64) declare market_fee: Float64
    @Struct.field('string', {optional: true}) declare name: string
    @Struct.field('string', {optional: true}) declare img: string
    @Struct.field('any', {optional: true}) declare data: Record<string, any>
}

@Struct.type('schema_object')
export class SchemaObject extends Struct {
    @Struct.field(Name) declare schema_name: Name
    @Struct.field(AtomicAssetsContract.Types.FORMAT, {array: true})
    declare format: AtomicAssetsContract.Types.FORMAT[]
    @Struct.field(Name, {optional: true}) declare contract: Name
    @Struct.field(Name, {optional: true}) declare collection_name: Name
    @Struct.field(CollectionObject, {optional: true}) declare collection: CollectionObject
    @Struct.field(UInt64) declare created_at_block: UInt64
    @Struct.field('string') declare created_at_time: string
}

@Struct.type('template_object')
export class TemplateObject extends Struct {
    @Struct.field(Int32) declare template_id: Int32
    @Struct.field('bool') declare is_transferable: boolean
    @Struct.field('bool') declare is_burnable: boolean
    @Struct.field(UInt32) declare issued_supply: UInt32
    @Struct.field(UInt32) declare max_supply: UInt32
    @Struct.field('any') declare immutable_data: Record<string, any>
    @Struct.field(Name, {optional: true}) declare contract: Name
    @Struct.field(CollectionObject, {optional: true}) declare collection: CollectionObject
    @Struct.field(SchemaObject, {optional: true}) declare schema: SchemaObject
    @Struct.field(UInt64) declare created_at_block: UInt64
    @Struct.field('string') declare created_at_time: string
    @Struct.field('string', {optional: true}) declare name: string
}

@Struct.type('assetpricev1')
export class AssetPriceV1 extends Struct {
    @Struct.field('string') declare token_symbol: string
    @Struct.field(UInt8) declare token_precision: UInt8
    @Struct.field(Name) declare token_contract: Name
    @Struct.field(UInt64) declare median: UInt64
    @Struct.field(UInt64) declare average: UInt64
    @Struct.field(UInt64) declare suggested_median: UInt64
    @Struct.field(UInt64) declare suggested_average: UInt64
    @Struct.field(UInt64) declare max: UInt64
    @Struct.field(UInt64) declare min: UInt64
}

@Struct.type('assetpricev2')
export class AssetPriceV2 extends Struct {
    @Struct.field(Name) declare market_contract: Name
    @Struct.field(Token) declare token: Token
    @Struct.field(UInt64) declare median: UInt64
    @Struct.field(UInt64) declare average: UInt64
    @Struct.field(UInt64) declare suggested_median: UInt64
    @Struct.field(UInt64) declare suggested_average: UInt64
    @Struct.field(UInt64) declare max: UInt64
    @Struct.field(UInt64) declare min: UInt64
    @Struct.field(UInt64) declare sales: UInt64
}

@Struct.type('asset_object')
export class AssetObject extends Struct {
    @Struct.field(UInt64) declare asset_id: UInt64
    @Struct.field(CollectionObject) declare collection: CollectionObject
    @Struct.field(SchemaObject) declare schema: SchemaObject
    @Struct.field(TemplateObject, {optional: true}) declare template: TemplateObject
    @Struct.field(TokenAmount, {array: true}) declare backed_tokens: TokenAmount[]
    @Struct.field('any') declare immutable_data: Record<string, any>
    @Struct.field('any') declare mutable_data: Record<string, any>
    @Struct.field('any') declare data: Record<string, any>
    @Struct.field(Name, {optional: true}) declare owner: Name
    @Struct.field('bool') declare is_transferable: boolean
    @Struct.field('bool') declare is_burnable: boolean
    @Struct.field('string', {optional: true}) declare name: string
    @Struct.field(Name, {optional: true}) declare contract: Name
    @Struct.field(Name, {optional: true}) declare burned_by_account: Name
    @Struct.field(UInt64, {optional: true}) declare burned_at_block: UInt64
    @Struct.field('string', {optional: true}) declare burned_at_time: string
    @Struct.field(UInt32, {optional: true}) declare template_mint: UInt32
    @Struct.field(UInt64) declare updated_at_block: UInt64
    @Struct.field('string') declare updated_at_time: string
    @Struct.field(UInt64) declare transferred_at_block: UInt64
    @Struct.field('string') declare transferred_at_time: string
    @Struct.field(UInt64) declare minted_at_block: UInt64
    @Struct.field('string') declare minted_at_time: string
}

@Struct.type('offer_object')
export class OfferObject extends Struct {
    @Struct.field(Name) declare contract: Name
    @Struct.field(UInt64) declare offer_id: UInt64
    @Struct.field(Name) declare sender_name: Name
    @Struct.field(Name) declare recipient_name: Name
    @Struct.field('string') declare memo: string
    @Struct.field(UInt8) declare state: UInt8
    @Struct.field('bool') declare is_sender_contract: boolean
    @Struct.field('bool') declare is_recipient_contract: boolean
    @Struct.field(AssetObject, {array: true}) declare sender_assets: AssetObject[]
    @Struct.field(AssetObject, {array: true}) declare recipient_assets: AssetObject[]
    @Struct.field(UInt64) declare updated_at_block: UInt64
    @Struct.field('string') declare updated_at_time: string
    @Struct.field(UInt64) declare created_at_block: UInt64
    @Struct.field('string') declare created_at_time: string
}

@Struct.type('transfer_object')
export class TransferObject extends Struct {
    @Struct.field(Name) declare contract: Name
    @Struct.field(UInt64) declare transfer_id: UInt64
    @Struct.field(Name) declare sender_name: Name
    @Struct.field(Name) declare recipient_name: Name
    @Struct.field('string') declare memo: string
    @Struct.field('string') declare txid: string
    @Struct.field(AssetObject, {array: true}) declare assets: AssetObject[]
    @Struct.field(UInt64) declare created_at_block: UInt64
    @Struct.field('string') declare created_at_time: string
}

@Struct.type('link_object')
export class LinkObject extends Struct {
    @Struct.field(Name) declare tools_contract: Name
    @Struct.field(Name) declare assets_contract: Name
    @Struct.field(UInt64) declare link_id: UInt64
    @Struct.field(Name) declare creator: Name
    @Struct.field(Name) declare claimer: Name
    @Struct.field(UInt8) declare state: UInt8
    @Struct.field(PublicKey) declare public_key: PublicKey
    @Struct.field('string') declare memo: string
    @Struct.field(AssetObject, {array: true}) declare assets: AssetObject[]
    @Struct.field(UInt64) declare created_at_block: UInt64
    @Struct.field('string') declare created_at_time: string
    @Struct.field(UInt64) declare updated_at_block: UInt64
    @Struct.field('string') declare updated_at_time: string
}

@Struct.type('sale_brief')
export class SaleBrief extends Struct {
    @Struct.field(Name) declare market_contract: Name
    @Struct.field(UInt64) declare sale_id: UInt64
}

@Struct.type('aucttion_brief')
export class AuctionBrief extends Struct {
    @Struct.field(Name) declare market_contract: Name
    @Struct.field(UInt64) declare auction_id: UInt64
}

@Struct.type('template_buyoffer')
export class TemplateBuyofferBrief extends Struct {
    @Struct.field(Name) declare market_contract: Name
    @Struct.field(UInt64) declare buyoffer_id: UInt64
    @Struct.field('string') declare token_symbol: string
}

@Struct.type('market_asset_object')
export class MarketAssetObject extends AssetObject {
    @Struct.field(SaleBrief, {array: true}) declare sales: SaleBrief[]
    @Struct.field(AuctionBrief, {array: true}) declare auctions: AuctionBrief[]
    @Struct.field(AssetPriceV2, {array: true, optional: true}) declare prices: AssetPriceV2[]
    @Struct.field(TemplateBuyofferBrief, {array: true, optional: true})
    declare template_buyoffers: TemplateBuyofferBrief[]
}

@Struct.type('sale_object')
export class SaleObject extends Struct {
    @Struct.field(Name) declare market_contract: Name
    @Struct.field(Name) declare assets_contract: Name
    @Struct.field(UInt64) declare sale_id: UInt64
    @Struct.field(Name) declare seller: Name
    @Struct.field(Name, {optional: true}) declare buyer: Name
    @Struct.field(UInt64) declare offer_id: UInt64
    @Struct.field(TokenAmount) declare price: TokenAmount
    @Struct.field(UInt64) declare listing_price: UInt64
    @Struct.field('string') declare listing_symbol: string
    @Struct.field(MarketAssetObject, {array: true}) declare assets: MarketAssetObject[]
    @Struct.field('string') declare maker_marketplace: Name
    @Struct.field('string', {optional: true}) declare taker_marketplace: Name
    @Struct.field(UInt8) declare state: UInt8
    @Struct.field('bool') declare is_seller_contract: boolean
    @Struct.field(Name) declare collection_name: Name
    @Struct.field(CollectionObject) declare collection: CollectionObject
    @Struct.field(UInt64) declare updated_at_block: UInt64
    @Struct.field('string') declare updated_at_time: string
    @Struct.field(UInt64) declare created_at_block: UInt64
    @Struct.field('string') declare created_at_time: string
}

@Struct.type('bid')
export class Bid extends Struct {
    @Struct.field(Int64) declare number: Int64
    @Struct.field(Name) declare account: Name
    @Struct.field(UInt64) declare amount: UInt64
    @Struct.field(UInt64) declare created_at_block: UInt64
    @Struct.field('string') declare created_at_time: string
    @Struct.field('string') declare txid: string
}

@Struct.type('auction_object')
export class AuctionObject extends Struct {
    @Struct.field(Name) declare market_contract: Name
    @Struct.field(Name) declare assets_contract: Name
    @Struct.field(UInt64) declare auction_id: UInt64
    @Struct.field(Name) declare seller: Name
    @Struct.field(MarketAssetObject, {array: true}) declare assets: MarketAssetObject[]
    @Struct.field('string') declare end_time: string
    @Struct.field(TokenAmount) declare price: TokenAmount
    @Struct.field(Bid, {array: true}) declare bids: Bid[]
    @Struct.field(UInt8) declare state: UInt8
    @Struct.field(Name, {optional: true}) declare buyer: Name
    @Struct.field('bool') declare claimed_by_seller: boolean
    @Struct.field('bool') declare claimed_by_buyer: boolean
    @Struct.field('string') declare maker_marketplace: Name
    @Struct.field('string', {optional: true}) declare taker_marketplace: Name
    @Struct.field(CollectionObject) declare collection: CollectionObject
    @Struct.field('bool') declare is_seller_contract: boolean
    @Struct.field(UInt64) declare created_at_block: UInt64
    @Struct.field('string') declare created_at_time: string
    @Struct.field(UInt64) declare updated_at_block: UInt64
    @Struct.field('string') declare updated_at_time: string
}

@Struct.type('buyoffer_object')
export class BuyofferObject extends Struct {
    @Struct.field(Name) declare market_contract: Name
    @Struct.field(Name) declare assets_contract: Name
    @Struct.field(UInt64) declare buyoffer_id: UInt64
    @Struct.field(Name) declare seller: Name
    @Struct.field(Name) declare buyer: Name
    @Struct.field(TokenAmount) declare price: TokenAmount
    @Struct.field(AssetObject, {array: true}) declare assets: AssetObject[]
    @Struct.field('string') declare maker_marketplace: Name
    @Struct.field('string', {optional: true}) declare taker_marketplace: Name
    @Struct.field(CollectionObject) declare collection: CollectionObject
    @Struct.field('string') declare memo: string
    @Struct.field('string', {optional: true}) declare decline_memo: string
    @Struct.field(UInt64) declare created_at_block: UInt64
    @Struct.field('string') declare created_at_time: string
    @Struct.field(UInt64) declare updated_at_block: UInt64
    @Struct.field('string') declare updated_at_time: string
    @Struct.field(UInt8) declare state: UInt8
}

@Struct.type('template_buyoffer_object')
export class TemplateBuyofferObject extends Struct {
    @Struct.field(Name) declare market_contract: Name
    @Struct.field(Name) declare assets_contract: Name
    @Struct.field(UInt64) declare buyoffer_id: UInt64
    @Struct.field(Name, {optional: true}) declare seller: Name
    @Struct.field(Name) declare buyer: Name
    @Struct.field(TokenAmount) declare price: TokenAmount
    @Struct.field(AssetObject, {array: true}) declare assets: AssetObject[]
    @Struct.field('string') declare maker_marketplace: Name
    @Struct.field('string', {optional: true}) declare taker_marketplace: Name
    @Struct.field(CollectionObject) declare collection: CollectionObject
    @Struct.field(TemplateObject) declare template: TemplateObject
    @Struct.field(UInt64) declare created_at_block: UInt64
    @Struct.field('string') declare created_at_time: string
    @Struct.field(UInt64) declare updated_at_block: UInt64
    @Struct.field('string') declare updated_at_time: string
    @Struct.field(UInt8) declare state: UInt8
}

@Struct.type('marketplace')
export class Marketplace extends Struct {
    @Struct.field('string') declare marketplace_name: Name
    @Struct.field(Name) declare creator: Name
    @Struct.field(UInt64) declare created_at_block: UInt64
    @Struct.field('string') declare created_at_time: string
}

@Struct.type('saleprice')
export class SalePrice extends Struct {
    @Struct.field(UInt64, {optional: true}) declare sale_id: UInt64
    @Struct.field(UInt64, {optional: true}) declare auction_id: UInt64
    @Struct.field(UInt64, {optional: true}) declare buyoffer_id: UInt64
    @Struct.field(UInt64) declare price: UInt64
    @Struct.field(UInt32) declare template_mint: UInt32
    @Struct.field('string') declare token_symbol: string
    @Struct.field(UInt8) declare token_precision: UInt8
    @Struct.field(Name) declare token_contract: Name
    @Struct.field('string') declare block_time: string
}

@Struct.type('salepriceday')
export class SalePriceDay extends Struct {
    @Struct.field(UInt64) declare median: UInt64
    @Struct.field(UInt64) declare average: UInt64
    @Struct.field(UInt64) declare volume: UInt64
    @Struct.field(UInt64) declare sales: UInt64
    @Struct.field(UInt32, {optional: true}) declare template_mint: UInt32
    @Struct.field('string') declare token_symbol: string
    @Struct.field(UInt8) declare token_precision: UInt8
    @Struct.field(Name) declare token_contract: Name
    @Struct.field('string') declare time: string
}

@Struct.type('templateprice')
export class TemplatePrice extends Struct {
    @Struct.field('string') declare token_symbol: string
    @Struct.field(UInt8) declare token_precision: UInt8
    @Struct.field(Name) declare token_contract: Name
    @Struct.field(Name) declare collection_name: Name
    @Struct.field(Int32) declare template_id: Int32
    @Struct.field(UInt64) declare median: UInt64
    @Struct.field(UInt64) declare average: UInt64
    @Struct.field(UInt64) declare suggested_median: UInt64
    @Struct.field(UInt64) declare suggested_average: UInt64
    @Struct.field(UInt64) declare max: UInt64
    @Struct.field(UInt64) declare min: UInt64
    @Struct.field(UInt64) declare sales: UInt64
}

@Struct.type('collectionprice')
export class CollectionPrice extends Struct {
    @Struct.field('string') declare token_symbol: string
    @Struct.field(UInt8) declare token_precision: UInt8
    @Struct.field(Name) declare token_contract: Name
    @Struct.field(UInt64) declare median: UInt64
    @Struct.field(UInt64) declare average: UInt64
    @Struct.field(UInt64) declare suggested_median: UInt64
    @Struct.field(UInt64) declare suggested_average: UInt64
    @Struct.field(UInt64) declare max: UInt64
    @Struct.field(UInt64) declare min: UInt64
}

@Struct.type('collection_wrapper')
export class CollectionWrapper extends Struct {
    @Struct.field(CollectionObject) declare collection: CollectionObject
    @Struct.field(UInt64, {optional: true}) declare assets: UInt64
    @Struct.field(CollectionPrice, {array: true, optional: true}) declare prices: CollectionPrice[]
}

@Struct.type('schema_wrapper')
export class SchemaWrapper extends Struct {
    @Struct.field(SchemaObject) declare schema: SchemaObject
    @Struct.field(UInt64) declare assets: UInt64
}

@Struct.type('template_wrapper')
export class TemplateWrapper extends Struct {
    @Struct.field(TemplateObject) declare template: TemplateObject
    @Struct.field(Int32) declare template_id: Int32
    @Struct.field(Name) declare collection_name: Name
    @Struct.field(UInt64) declare assets: UInt64
}

@Struct.type('inventoryprice')
export class InventoryPrice extends Struct {
    @Struct.field(CollectionWrapper, {array: true}) declare collections: CollectionWrapper[]
}

@Struct.type('action_log')
export class ActionLog extends Struct {
    @Struct.field(UInt64) declare log_id: UInt64
    @Struct.field(Name) declare name: Name
    @Struct.field('any') declare data: Record<string, any>
    @Struct.field('string') declare txid: string
    @Struct.field(UInt64) declare created_at_block: UInt64
    @Struct.field('string') declare created_at_time: string
}

@Struct.type('account_info')
export class AccountInfo extends Struct {
    @Struct.field(CollectionWrapper, {array: true}) declare collections: CollectionWrapper[]
    @Struct.field(SchemaWrapper, {array: true}) declare schemas: SchemaWrapper[]
    @Struct.field(TemplateWrapper, {array: true}) declare templates: TemplateWrapper[]
    @Struct.field(UInt64) declare assets: UInt64
}

@Struct.type('burned_by_template')
export class BurnedByTemplate extends Struct {
    @Struct.field(UInt64) declare burned: UInt64
    @Struct.field(Int32) declare template_id: Int32
}

@Struct.type('burned_by_schema')
export class BurnedBySchema extends Struct {
    @Struct.field(UInt64) declare burned: UInt64
    @Struct.field(Name) declare schema_name: Name
}

@Struct.type('collection_stats')
export class CollectionStats extends Struct {
    @Struct.field(UInt64) declare assets: UInt64
    @Struct.field(UInt64) declare burned: UInt64
    @Struct.field(UInt64) declare templates: UInt64
    @Struct.field(UInt64) declare schemas: UInt64
    @Struct.field(BurnedByTemplate, {array: true})
    declare burned_by_template: BurnedByTemplate[]
    @Struct.field(BurnedBySchema, {array: true})
    declare burned_by_schema: BurnedBySchema[]
}

@Struct.type('asset_stats')
export class AssetStats extends Struct {
    @Struct.field(UInt32) declare template_mint: UInt32
}

@Struct.type('template_stats')
export class TemplateStats extends Struct {
    @Struct.field(UInt64) declare assets: UInt64
    @Struct.field(UInt64) declare burned: UInt64
}

@Struct.type('schema_stats')
export class SchemaStats extends Struct {
    @Struct.field(UInt64) declare assets: UInt64
    @Struct.field(UInt64) declare burned: UInt64
    @Struct.field(UInt64) declare templates: UInt64
}

@Struct.type('collection_burn')
export class CollectionBurn extends Struct {
    @Struct.field(Name) declare collection_name: Name
    @Struct.field(UInt64) declare assets: UInt64
}

@Struct.type('template_burn')
export class TemplateBurn extends Struct {
    @Struct.field(Name) declare collection_name: Name
    @Struct.field(Int32) declare template_id: Int32
    @Struct.field(UInt64) declare assets: UInt64
}

@Struct.type('account_burns')
export class AccountBurns extends Struct {
    @Struct.field(CollectionWrapper, {array: true}) declare collections: CollectionWrapper[]
    @Struct.field(TemplateBurn, {array: true}) declare templates: TemplateBurn[]
    @Struct.field(UInt64) declare assets: UInt64
}

@Struct.type('asset_sales')
export class AssetSale extends Struct {
    @Struct.field(UInt64, {optional: true}) declare sale_id: UInt64
    @Struct.field(UInt64, {optional: true}) declare auction_id: UInt64
    @Struct.field(UInt64, {optional: true}) declare buyoffer_id: UInt64
    @Struct.field(UInt64) declare price: UInt64
    @Struct.field('string') declare token_symbol: string
    @Struct.field(UInt8) declare token_precision: UInt8
    @Struct.field(Name) declare token_contract: Name
    @Struct.field(Name) declare seller: Name
    @Struct.field(Name) declare buyer: Name
    @Struct.field('string') declare block_time: string
}

@Struct.type('resp')
export class ResponseStruct extends Struct {
    @Struct.field('bool') declare success: boolean
    @Struct.field(Float64) declare query_time: Float64
}

@Struct.type('get_count_resp')
export class CountResponseStruct extends ResponseStruct {
    @Struct.field(UInt64) declare data: UInt64
}
