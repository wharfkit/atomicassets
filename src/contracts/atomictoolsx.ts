import type {Action, NameType, PublicKeyType, SignatureType, UInt64Type} from '@wharfkit/antelope'
import {ABI, Blob, Name, PublicKey, Signature, Struct, UInt64} from '@wharfkit/antelope'
import type {ActionOptions, ContractArgs, PartialBy} from '@wharfkit/contract'
import {Contract as BaseContract} from '@wharfkit/contract'
export const abiBlob = Blob.from(
    'DmVvc2lvOjphYmkvMS4xAAkMYW5ub3VuY2VsaW5rAAQHY3JlYXRvcgRuYW1lA2tleQpwdWJsaWNfa2V5CWFzc2V0X2lkcwh1aW50NjRbXQRtZW1vBnN0cmluZwRhdXRoAAEFbm9uY2UGc3RyaW5nCmNhbmNlbGxpbmsAAQdsaW5rX2lkBnVpbnQ2NAljbGFpbWxpbmsAAwdsaW5rX2lkBnVpbnQ2NAdjbGFpbWVyBG5hbWURY2xhaW1lcl9zaWduYXR1cmUJc2lnbmF0dXJlCGNvbmZpZ19zAAMHdmVyc2lvbgZzdHJpbmcMbGlua19jb3VudGVyBnVpbnQ2NBRhdG9taWNhc3NldHNfYWNjb3VudARuYW1lBGluaXQAAAdsaW5rc19zAAYHbGlua19pZAZ1aW50NjQHY3JlYXRvcgRuYW1lA2tleQpwdWJsaWNfa2V5CWFzc2V0X2lkcwh1aW50NjRbXRJhc3NldHNfdHJhbnNmZXJyZWQEYm9vbARtZW1vBnN0cmluZwxsb2dsaW5rc3RhcnQAAQdsaW5rX2lkBnVpbnQ2NApsb2duZXdsaW5rAAUHbGlua19pZAZ1aW50NjQHY3JlYXRvcgRuYW1lA2tleQpwdWJsaWNfa2V5CWFzc2V0X2lkcwh1aW50NjRbXQRtZW1vBnN0cmluZwcAp4sKTU3nNAxhbm5vdW5jZWxpbmsAAAAAAADQsjYEYXV0aAAAAJwuRoWmQQpjYW5jZWxsaW5rAAAAgNNF6UxECWNsYWltbGluawAAAAAAAJDddARpbml0AJCvyRhOFxmNDGxvZ2xpbmtzdGFydAAAAJwucjUZjQpsb2duZXdsaW5rAAIAAAAAMLcmRQNpNjQAAAhjb25maWdfcwAAAAAADKeLA2k2NAAAB2xpbmtzX3MAAAAA'
)
export const abi = ABI.from(abiBlob)
export type ActionType =
    | 'announcelink'
    | 'auth'
    | 'cancellink'
    | 'claimlink'
    | 'init'
    | 'loglinkstart'
    | 'lognewlink'

export class Contract extends BaseContract {
    constructor(args: PartialBy<ContractArgs, 'abi' | 'account'>) {
        super({
            client: args.client,
            abi: abi,
            account: Name.from('atomictoolsx'),
        })
    }
    action<T extends ActionType>(
        name: T,
        data: ActionNameParams[T],
        options?: ActionOptions
    ): Action {
        return super.action(name, data, options)
    }
    table<T extends 'config' | 'links'>(name: T, scope?: NameType) {
        return super.table(name, scope, TableMap[name])
    }
}
export interface ActionNameParams {
    announcelink: ActionParams.Announcelink
    auth: ActionParams.Auth
    cancellink: ActionParams.Cancellink
    claimlink: ActionParams.Claimlink
    init: ActionParams.Init
    loglinkstart: ActionParams.Loglinkstart
    lognewlink: ActionParams.Lognewlink
}
export namespace ActionParams {
    export interface Announcelink {
        creator: NameType
        key: PublicKeyType
        asset_ids: UInt64Type[]
        memo: string
    }
    export interface Auth {
        nonce: string
    }
    export interface Cancellink {
        link_id: UInt64Type
    }
    export interface Claimlink {
        link_id: UInt64Type
        claimer: NameType
        claimer_signature: SignatureType
    }
    export interface Init {}
    export interface Loglinkstart {
        link_id: UInt64Type
    }
    export interface Lognewlink {
        link_id: UInt64Type
        creator: NameType
        key: PublicKeyType
        asset_ids: UInt64Type[]
        memo: string
    }
}
export namespace Types {
    @Struct.type('announcelink')
    export class Announcelink extends Struct {
        @Struct.field(Name)
        creator!: Name
        @Struct.field(PublicKey)
        key!: PublicKey
        @Struct.field(UInt64, {array: true})
        asset_ids!: UInt64[]
        @Struct.field('string')
        memo!: string
    }
    @Struct.type('auth')
    export class Auth extends Struct {
        @Struct.field('string')
        nonce!: string
    }
    @Struct.type('cancellink')
    export class Cancellink extends Struct {
        @Struct.field(UInt64)
        link_id!: UInt64
    }
    @Struct.type('claimlink')
    export class Claimlink extends Struct {
        @Struct.field(UInt64)
        link_id!: UInt64
        @Struct.field(Name)
        claimer!: Name
        @Struct.field(Signature)
        claimer_signature!: Signature
    }
    @Struct.type('config_s')
    export class ConfigS extends Struct {
        @Struct.field('string')
        version!: string
        @Struct.field(UInt64)
        link_counter!: UInt64
        @Struct.field(Name)
        atomicassets_account!: Name
    }
    @Struct.type('init')
    export class Init extends Struct {}
    @Struct.type('links_s')
    export class LinksS extends Struct {
        @Struct.field(UInt64)
        link_id!: UInt64
        @Struct.field(Name)
        creator!: Name
        @Struct.field(PublicKey)
        key!: PublicKey
        @Struct.field(UInt64, {array: true})
        asset_ids!: UInt64[]
        @Struct.field('bool')
        assets_transferred!: boolean
        @Struct.field('string')
        memo!: string
    }
    @Struct.type('loglinkstart')
    export class Loglinkstart extends Struct {
        @Struct.field(UInt64)
        link_id!: UInt64
    }
    @Struct.type('lognewlink')
    export class Lognewlink extends Struct {
        @Struct.field(UInt64)
        link_id!: UInt64
        @Struct.field(Name)
        creator!: Name
        @Struct.field(PublicKey)
        key!: PublicKey
        @Struct.field(UInt64, {array: true})
        asset_ids!: UInt64[]
        @Struct.field('string')
        memo!: string
    }
}
const TableMap = {
    config: Types.ConfigS,
    links: Types.LinksS,
}
