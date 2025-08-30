import {Float64, Name, Struct, UInt64} from '@wharfkit/antelope'

import {
    ActionLog,
    AssetPriceV1,
    AssetSale,
    AssetStats,
    AtomicMarketConfig,
    AuctionObject,
    BuyofferObject,
    InventoryPrice,
    MarketAssetObject,
    Marketplace,
    OfferObject,
    ResponseStruct,
    SaleObject,
    SalePrice,
    SalePriceDay,
    SchemaObject,
    TemplateBuyofferObject,
    TemplateObject,
    TemplatePrice,
    Token,
    TransferObject,
} from '../types'

@Struct.type('collection_stat')
export class CollectionStat extends Struct {
    @Struct.field(Name) declare contract: Name
    @Struct.field(Name) declare collection_name: Name
    @Struct.field('string', {optional: true}) declare name: string
    @Struct.field('string', {optional: true}) declare img: string
    @Struct.field(Name) declare author: Name
    @Struct.field('bool') declare allow_notify: boolean
    @Struct.field(Name, {array: true}) declare authorized_accounts: Name[]
    @Struct.field(Name, {array: true}) declare notify_accounts: Name[]
    @Struct.field(Float64) declare market_fee: Float64
    @Struct.field('any') declare data: Record<string, any>
    @Struct.field(UInt64) declare created_at_block: UInt64
    @Struct.field('string') declare created_at_time: string
    @Struct.field(UInt64) declare volume: UInt64
    @Struct.field(UInt64) declare sales: UInt64
}
@Struct.type('template_stat')
export class TemplateStat extends Struct {
    @Struct.field(UInt64) declare volume: UInt64
    @Struct.field(UInt64) declare sales: UInt64
    @Struct.field(TemplateObject) declare template: TemplateObject
}

@Struct.type('market_templates')
export class MarketTemplates extends Struct {
    @Struct.field(Token) declare symbol: Token
    @Struct.field(TemplateStat, {array: true}) declare results: TemplateStat[]
}

@Struct.type('graph_stat')
export class GraphStat extends Struct {
    @Struct.field(UInt64) declare volume: UInt64
    @Struct.field(UInt64) declare sales: UInt64
    @Struct.field(UInt64) declare max: UInt64
    @Struct.field('string') declare time: string
}

@Struct.type('market_graph')
export class MarketGraph extends Struct {
    @Struct.field(Token) declare symbol: Token
    @Struct.field(GraphStat, {array: true}) declare results: GraphStat[]
}

@Struct.type('sale_stat')
export class SaleStat extends Struct {
    @Struct.field(UInt64, {optional: true}) declare volume: UInt64
    @Struct.field(UInt64) declare sales: UInt64
}

@Struct.type('market_sale')
export class MarketSale extends Struct {
    @Struct.field(Token) declare symbol: Token
    @Struct.field(SaleStat) declare result: SaleStat
}

@Struct.type('market_collections')
export class MarketCollections extends Struct {
    @Struct.field(Token) declare symbol: Token
    @Struct.field(CollectionStat, {array: true}) declare results: CollectionStat[]
}

@Struct.type('market_collection')
export class MarketCollection extends Struct {
    @Struct.field(Token) declare symbol: Token
    @Struct.field(CollectionStat) declare result: CollectionStat
}

@Struct.type('account_stat')
export class AccountStat extends Struct {
    @Struct.field(Name) declare account: Name
    @Struct.field(UInt64) declare buy_volume: UInt64
    @Struct.field(UInt64) declare sell_volume: UInt64
}

@Struct.type('market_accounts')
export class MarketAccounts extends Struct {
    @Struct.field(Token) declare symbol: Token
    @Struct.field(AccountStat, {array: true}) declare results: AccountStat[]
}

@Struct.type('market_account')
export class MarketAccount extends Struct {
    @Struct.field(Token) declare symbol: Token
    @Struct.field(AccountStat) declare result: AccountStat
}

@Struct.type('schema_stat_v1')
export class SchemaStatV1 extends Struct {
    @Struct.field(Name) declare contract: Name
    @Struct.field(Name) declare collection_name: Name
    @Struct.field(Name) declare schema_name: Name
    @Struct.field(UInt64) declare volume: UInt64
    @Struct.field(UInt64) declare sales: UInt64
    @Struct.field(UInt64) declare listings: UInt64
}

@Struct.type('schema_stat_v2')
export class SchemaStatV2 extends Struct {
    @Struct.field(Name) declare schema_name: Name
    @Struct.field(UInt64) declare volume: UInt64
    @Struct.field(UInt64) declare sales: UInt64
    @Struct.field(SchemaObject) declare schema: SchemaObject
}

@Struct.type('market_schemas_v1')
export class MarketSchemasV1 extends Struct {
    @Struct.field(Token) declare symbol: Token
    @Struct.field(SchemaStatV1, {array: true}) declare results: SchemaStatV1[]
}

@Struct.type('market_schemas_v2')
export class MarketSchemasV2 extends Struct {
    @Struct.field(Token) declare symbol: Token
    @Struct.field(SchemaStatV2, {array: true}) declare results: SchemaStatV2[]
}

@Struct.type('action_logs_resp')
export class ActionLogsResponse extends ResponseStruct {
    @Struct.field(ActionLog, {array: true}) declare data: ActionLog[]
}

@Struct.type('get_assets_resp')
export class GetAssetsResponse extends ResponseStruct {
    @Struct.field(MarketAssetObject, {array: true}) declare data: MarketAssetObject[]
}

@Struct.type('get_asset_resp')
export class GetAssetResponse extends ResponseStruct {
    @Struct.field(MarketAssetObject) declare data: MarketAssetObject
}

@Struct.type('get_asset_stats_resp')
export class GetAssetStatsResponse extends ResponseStruct {
    @Struct.field(AssetStats) declare data: AssetStats
}

@Struct.type('get_asset_sales_resp')
export class GetAssetSalesResponse extends ResponseStruct {
    @Struct.field(AssetSale, {array: true}) declare data: AssetSale[]
}

@Struct.type('get_offers_resp')
export class GetOffersResponse extends ResponseStruct {
    @Struct.field(OfferObject, {array: true}) declare data: OfferObject[]
}

@Struct.type('get_offer_resp')
export class GetOfferResponse extends ResponseStruct {
    @Struct.field(OfferObject) declare data: OfferObject
}

@Struct.type('get_transfers_resp')
export class GetTransfersResponse extends ResponseStruct {
    @Struct.field(TransferObject, {array: true}) declare data: TransferObject[]
}

@Struct.type('get_config_resp')
export class GetConfigResponse extends ResponseStruct {
    @Struct.field(AtomicMarketConfig) declare data: AtomicMarketConfig
}

@Struct.type('get_sale_resp')
export class GetSaleResponse extends ResponseStruct {
    @Struct.field(SaleObject) declare data: SaleObject
}

@Struct.type('get_sales_resp')
export class GetSalesResponse extends ResponseStruct {
    @Struct.field(SaleObject, {array: true}) declare data: SaleObject[]
}

@Struct.type('get_sales_templates_resp')
export class GetSalesTemplatesResponse extends ResponseStruct {
    @Struct.field(SaleObject, {array: true}) declare data: SaleObject[]
}

@Struct.type('get_auctions_resp')
export class GetAuctionsResponse extends ResponseStruct {
    @Struct.field(AuctionObject, {array: true}) declare data: AuctionObject[]
}

@Struct.type('get_auction_resp')
export class GetAuctionResponse extends ResponseStruct {
    @Struct.field(AuctionObject) declare data: AuctionObject
}

@Struct.type('get_buyoffers_resp')
export class GetBuyoffersResponse extends ResponseStruct {
    @Struct.field(BuyofferObject, {array: true}) declare data: BuyofferObject[]
}

@Struct.type('get_buyoffer_resp')
export class GetBuyofferResponse extends ResponseStruct {
    @Struct.field(BuyofferObject) declare data: BuyofferObject
}

@Struct.type('get_template_buyoffers_resp')
export class GetTemplateBuyoffersResponse extends ResponseStruct {
    @Struct.field(TemplateBuyofferObject, {array: true}) declare data: TemplateBuyofferObject[]
}

@Struct.type('get_template_buyoffer_resp')
export class GetTemplateBuyofferResponse extends ResponseStruct {
    @Struct.field(TemplateBuyofferObject) declare data: TemplateBuyofferObject
}

@Struct.type('get_marketplaces_resp')
export class GetMarketplacesResponse extends ResponseStruct {
    @Struct.field(Marketplace, {array: true}) declare data: Marketplace[]
}

@Struct.type('get_marketplace_resp')
export class GetMarketplaceResponse extends ResponseStruct {
    @Struct.field(Marketplace) declare data: Marketplace
}

@Struct.type('get_sale_prices_resp')
export class GetSalePricesResponse extends ResponseStruct {
    @Struct.field(SalePrice, {array: true}) declare data: SalePrice[]
}

@Struct.type('get_sale_prices_days_resp')
export class GetSalePricesDaysResponse extends ResponseStruct {
    @Struct.field(SalePriceDay, {array: true}) declare data: SalePriceDay[]
}

@Struct.type('get_template_prices_resp')
export class GetTemplatePricesResponse extends ResponseStruct {
    @Struct.field(TemplatePrice, {array: true}) declare data: TemplatePrice[]
}

@Struct.type('get_asset_prices_resp')
export class GetAssetPricesResponse extends ResponseStruct {
    @Struct.field(AssetPriceV1, {array: true}) declare data: AssetPriceV1[]
}

@Struct.type('get_asset_prices_resp')
export class GetInventoryPricesResponse extends ResponseStruct {
    @Struct.field(InventoryPrice) declare data: InventoryPrice
}

@Struct.type('get_stats_collections_resp')
export class GetStatsCollectionsResponse extends ResponseStruct {
    @Struct.field(MarketCollections) declare data: MarketCollections
}

@Struct.type('get_stats_collection_resp')
export class GetStatsCollectionResponse extends ResponseStruct {
    @Struct.field(MarketCollection) declare data: MarketCollection
}

@Struct.type('get_stats_accounts_resp')
export class GetStatsAccountsResponse extends ResponseStruct {
    @Struct.field(MarketAccounts) declare data: MarketAccounts
}

@Struct.type('get_stats_account_resp')
export class GetStatsAccountResponse extends ResponseStruct {
    @Struct.field(MarketAccount) declare data: MarketAccount
}

@Struct.type('get_stats_schemas_v1_resp')
export class GetStatsSchemasV1Response extends ResponseStruct {
    @Struct.field(MarketSchemasV1) declare data: MarketSchemasV1
}

@Struct.type('get_stats_schemas_v2_resp')
export class GetStatsSchemasV2Response extends ResponseStruct {
    @Struct.field(MarketSchemasV2) declare data: MarketSchemasV2
}

@Struct.type('get_stats_templates_resp')
export class GetStatsTemplatesResponse extends ResponseStruct {
    @Struct.field(MarketTemplates) declare data: MarketTemplates
}

@Struct.type('get_stats_graph_resp')
export class GetStatsGraphResponse extends ResponseStruct {
    @Struct.field(MarketGraph) declare data: MarketGraph
}

@Struct.type('get_stats_sales_resp')
export class GetStatsSalesResponse extends ResponseStruct {
    @Struct.field(MarketSale) declare data: MarketSale
}
