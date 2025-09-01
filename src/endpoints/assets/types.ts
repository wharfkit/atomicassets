import {Int32, Name, Struct, UInt64} from '@wharfkit/antelope'

import {
    AccountBurns,
    AccountInfo,
    ActionLog,
    AssetObject,
    AssetStats,
    AtomicAssetsConfig,
    CollectionObject,
    CollectionStats,
    OfferObject,
    ResponseStruct,
    SchemaObject,
    SchemaStats,
    TemplateObject,
    TemplateStats,
    TransferObject,
} from '../types'

@Struct.type('account_assets')
export class AccountAssets extends Struct {
    @Struct.field(Name) declare account: Name
    @Struct.field(UInt64) declare assets: UInt64
}

@Struct.type('action_logs_resp')
export class ActionLogsResponse extends ResponseStruct {
    @Struct.field(ActionLog, {array: true}) declare data: ActionLog[]
}

@Struct.type('get_config_resp')
export class GetConfigResponse extends ResponseStruct {
    @Struct.field(AtomicAssetsConfig) declare data: AtomicAssetsConfig
}

@Struct.type('get_accounts_resp')
export class GetAccountsResponse extends ResponseStruct {
    @Struct.field(AccountAssets, {array: true}) declare data: AccountAssets[]
}

@Struct.type('get_account_resp')
export class GetAccountResponse extends ResponseStruct {
    @Struct.field(AccountInfo) declare data: AccountInfo
}

@Struct.type('schema_count')
export class SchemaCount extends Struct {
    @Struct.field(Name) declare schema_name: Name
    @Struct.field(UInt64) declare assets: UInt64
}

@Struct.type('template_count')
export class TemplateCount extends Struct {
    @Struct.field(Int32) declare template_id: Int32
    @Struct.field(UInt64) declare assets: UInt64
}

@Struct.type('template_schema_count')
export class TemplateSchemaCount extends Struct {
    @Struct.field(SchemaCount, {array: true}) declare schemas: SchemaCount[]
    @Struct.field(TemplateCount, {array: true}) declare templates: TemplateCount[]
}

@Struct.type('get_account_template_schema_count_resp')
export class GetAccountTemplateSchemaCountResponse extends ResponseStruct {
    @Struct.field(TemplateSchemaCount) declare data: TemplateSchemaCount
}

@Struct.type('get_collections_resp')
export class GetCollectionsResponse extends ResponseStruct {
    @Struct.field(CollectionObject, {array: true}) declare data: CollectionObject[]
}

@Struct.type('get_collection_resp')
export class GetCollectionResponse extends ResponseStruct {
    @Struct.field(CollectionObject) declare data: CollectionObject
}

@Struct.type('get_collection_stats_resp')
export class GetCollectionStatsResponse extends ResponseStruct {
    @Struct.field(CollectionStats) declare data: CollectionStats
}

@Struct.type('get_schemas_resp')
export class GetSchemasResponse extends ResponseStruct {
    @Struct.field(SchemaObject, {array: true}) declare data: SchemaObject[]
}

@Struct.type('get_schema_resp')
export class GetSchemaResponse extends ResponseStruct {
    @Struct.field(SchemaObject) declare data: SchemaObject
}

@Struct.type('get_schema_stats_resp')
export class GetSchemaStatsResponse extends ResponseStruct {
    @Struct.field(SchemaStats) declare data: SchemaStats
}

@Struct.type('get_templates_resp')
export class GetTemplatesResponse extends ResponseStruct {
    @Struct.field(TemplateObject, {array: true}) declare data: TemplateObject[]
}

@Struct.type('get_template_resp')
export class GetTemplateResponse extends ResponseStruct {
    @Struct.field(TemplateObject) declare data: TemplateObject
}

@Struct.type('get_template_stats_resp')
export class GetTemplateStatsResponse extends ResponseStruct {
    @Struct.field(TemplateStats) declare data: TemplateStats
}

@Struct.type('get_assets_resp')
export class GetAssetsResponse extends ResponseStruct {
    @Struct.field(AssetObject, {array: true}) declare data: AssetObject[]
}

@Struct.type('get_asset_resp')
export class GetAssetResponse extends ResponseStruct {
    @Struct.field(AssetObject) declare data: AssetObject
}

@Struct.type('get_asset_stats_resp')
export class GetAssetStatsResponse extends ResponseStruct {
    @Struct.field(AssetStats) declare data: AssetStats
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

@Struct.type('get_account_burns_resp')
export class GetAccountBurnsResponse extends ResponseStruct {
    @Struct.field(AccountBurns) declare data: AccountBurns
}
