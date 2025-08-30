import {Struct} from '@wharfkit/antelope'
import {ActionLog, AtomicToolsConfig, LinkObject, ResponseStruct} from '../types'

@Struct.type('action_logs_resp')
export class ActionLogsResponse extends ResponseStruct {
    @Struct.field(ActionLog, {array: true}) declare data: ActionLog[]
}

@Struct.type('get_links_resp')
export class GetLinksResponse extends ResponseStruct {
    @Struct.field(LinkObject, {array: true}) declare data: LinkObject[]
}

@Struct.type('get_link_resp')
export class GetLinkResponse extends ResponseStruct {
    @Struct.field(LinkObject) declare data: LinkObject
}

@Struct.type('get_config_resp')
export class GetConfigResponse extends ResponseStruct {
    @Struct.field(AtomicToolsConfig) declare data: AtomicToolsConfig
}
