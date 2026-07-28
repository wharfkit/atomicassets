import type {
    Action,
    AssetType,
    BytesType,
    Float32Type,
    Float64Type,
    Int16Type,
    Int32Type,
    Int64Type,
    Int8Type,
    NameType,
    UInt16Type,
    UInt32Type,
    UInt64Type,
    UInt8Type,
} from '@wharfkit/antelope'
import {
    ABI,
    Asset,
    Blob,
    Bytes,
    Float32,
    Float64,
    Int16,
    Int32,
    Int64,
    Int8,
    Name,
    Struct,
    UInt16,
    UInt32,
    UInt64,
    UInt8,
    Variant,
} from '@wharfkit/antelope'
import type {ActionOptions, ContractArgs, PartialBy, Table} from '@wharfkit/contract'
import {Contract as BaseContract} from '@wharfkit/contract'
export const abiBlob = Blob.from(
    'DmVvc2lvOjphYmkvMS4yDRBBVE9NSUNfQVRUUklCVVRFwgF2YXJpYW50X2ludDhfaW50MTZfaW50MzJfaW50NjRfdWludDhfdWludDE2X3VpbnQzMl91aW50NjRfZmxvYXQzMl9mbG9hdDY0X3N0cmluZ19JTlQ4X1ZFQ19JTlQxNl9WRUNfSU5UMzJfVkVDX0lOVDY0X1ZFQ19VSU5UOF9WRUNfVUlOVDE2X1ZFQ19VSU5UMzJfVkVDX1VJTlQ2NF9WRUNfRkxPQVRfVkVDX0RPVUJMRV9WRUNfU1RSSU5HX1ZFQw1BVFRSSUJVVEVfTUFQHnBhaXJfc3RyaW5nX0FUT01JQ19BVFRSSUJVVEVbXQpET1VCTEVfVkVDCWZsb2F0NjRbXQlGTE9BVF9WRUMJZmxvYXQzMltdCUlOVDE2X1ZFQwdpbnQxNltdCUlOVDMyX1ZFQwdpbnQzMltdCUlOVDY0X1ZFQwdpbnQ2NFtdCElOVDhfVkVDBWJ5dGVzClNUUklOR19WRUMIc3RyaW5nW10KVUlOVDE2X1ZFQwh1aW50MTZbXQpVSU5UMzJfVkVDCHVpbnQzMltdClVJTlQ2NF9WRUMIdWludDY0W10JVUlOVDhfVkVDB3VpbnQ4W10+BkZPUk1BVAACBG5hbWUGc3RyaW5nBHR5cGUGc3RyaW5nC0ZPUk1BVF9UWVBFAAMEbmFtZQZzdHJpbmcJbWVkaWF0eXBlBnN0cmluZwRpbmZvBnN0cmluZwxhY2NlcHRhdXN3YXAAAQ9jb2xsZWN0aW9uX25hbWUEbmFtZQthY2NlcHRvZmZlcgABCG9mZmVyX2lkBnVpbnQ2NAphZGRjb2xhdXRoAAIPY29sbGVjdGlvbl9uYW1lBG5hbWUOYWNjb3VudF90b19hZGQEbmFtZQxhZGRjb25mdG9rZW4AAg50b2tlbl9jb250cmFjdARuYW1lDHRva2VuX3N5bWJvbAZzeW1ib2wMYWRkbm90aWZ5YWNjAAIPY29sbGVjdGlvbl9uYW1lBG5hbWUOYWNjb3VudF90b19hZGQEbmFtZQxhZG1pbmNvbGVkaXQAARtjb2xsZWN0aW9uX2Zvcm1hdF9leHRlbnNpb24IRk9STUFUW10MYW5ub3VuY2VkZXBvAAIFb3duZXIEbmFtZRJzeW1ib2xfdG9fYW5ub3VuY2UGc3ltYm9sCGFzc2V0c19zAAgIYXNzZXRfaWQGdWludDY0D2NvbGxlY3Rpb25fbmFtZQRuYW1lC3NjaGVtYV9uYW1lBG5hbWULdGVtcGxhdGVfaWQFaW50MzIJcmFtX3BheWVyBG5hbWUNYmFja2VkX3Rva2Vucwdhc3NldFtdGWltbXV0YWJsZV9zZXJpYWxpemVkX2RhdGEHdWludDhbXRdtdXRhYmxlX3NlcmlhbGl6ZWRfZGF0YQd1aW50OFtdDmF1dGhvcl9zd2Fwc19zAAQPY29sbGVjdGlvbl9uYW1lBG5hbWUOY3VycmVudF9hdXRob3IEbmFtZQpuZXdfYXV0aG9yBG5hbWUPYWNjZXB0YW5jZV9kYXRlBnVpbnQzMgliYWNrYXNzZXQABAVwYXllcgRuYW1lC2Fzc2V0X293bmVyBG5hbWUIYXNzZXRfaWQGdWludDY0DXRva2VuX3RvX2JhY2sFYXNzZXQKYmFsYW5jZXNfcwACBW93bmVyBG5hbWUKcXVhbnRpdGllcwdhc3NldFtdCWJ1cm5hc3NldAACC2Fzc2V0X293bmVyBG5hbWUIYXNzZXRfaWQGdWludDY0C2NhbmNlbG9mZmVyAAEIb2ZmZXJfaWQGdWludDY0DWNvbGxlY3Rpb25zX3MABw9jb2xsZWN0aW9uX25hbWUEbmFtZQZhdXRob3IEbmFtZQxhbGxvd19ub3RpZnkEYm9vbBNhdXRob3JpemVkX2FjY291bnRzBm5hbWVbXQ9ub3RpZnlfYWNjb3VudHMGbmFtZVtdCm1hcmtldF9mZWUHZmxvYXQ2NA9zZXJpYWxpemVkX2RhdGEHdWludDhbXQhjb25maWdfcwAFDWFzc2V0X2NvdW50ZXIGdWludDY0EHRlbXBsYXRlX2NvdW50ZXIFaW50MzINb2ZmZXJfY291bnRlcgZ1aW50NjQRY29sbGVjdGlvbl9mb3JtYXQIRk9STUFUW10Qc3VwcG9ydGVkX3Rva2VucxFleHRlbmRlZF9zeW1ib2xbXQxjcmVhdGVhdXN3YXAAAw9jb2xsZWN0aW9uX25hbWUEbmFtZQpuZXdfYXV0aG9yBG5hbWUFb3duZXIEYm9vbAljcmVhdGVjb2wABwZhdXRob3IEbmFtZQ9jb2xsZWN0aW9uX25hbWUEbmFtZQxhbGxvd19ub3RpZnkEYm9vbBNhdXRob3JpemVkX2FjY291bnRzBm5hbWVbXQ9ub3RpZnlfYWNjb3VudHMGbmFtZVtdCm1hcmtldF9mZWUHZmxvYXQ2NARkYXRhDUFUVFJJQlVURV9NQVALY3JlYXRlb2ZmZXIABQZzZW5kZXIEbmFtZQlyZWNpcGllbnQEbmFtZRBzZW5kZXJfYXNzZXRfaWRzCHVpbnQ2NFtdE3JlY2lwaWVudF9hc3NldF9pZHMIdWludDY0W10EbWVtbwZzdHJpbmcMY3JlYXRlc2NoZW1hAAQSYXV0aG9yaXplZF9jcmVhdG9yBG5hbWUPY29sbGVjdGlvbl9uYW1lBG5hbWULc2NoZW1hX25hbWUEbmFtZQ1zY2hlbWFfZm9ybWF0CEZPUk1BVFtdC2NyZWF0ZXRlbXBsAAcSYXV0aG9yaXplZF9jcmVhdG9yBG5hbWUPY29sbGVjdGlvbl9uYW1lBG5hbWULc2NoZW1hX25hbWUEbmFtZQx0cmFuc2ZlcmFibGUEYm9vbAhidXJuYWJsZQRib29sCm1heF9zdXBwbHkGdWludDMyDmltbXV0YWJsZV9kYXRhDUFUVFJJQlVURV9NQVAMY3JlYXRldGVtcGwyAAgSYXV0aG9yaXplZF9jcmVhdG9yBG5hbWUPY29sbGVjdGlvbl9uYW1lBG5hbWULc2NoZW1hX25hbWUEbmFtZQx0cmFuc2ZlcmFibGUEYm9vbAhidXJuYWJsZQRib29sCm1heF9zdXBwbHkGdWludDMyDmltbXV0YWJsZV9kYXRhDUFUVFJJQlVURV9NQVAMbXV0YWJsZV9kYXRhDUFUVFJJQlVURV9NQVAMZGVjbGluZW9mZmVyAAEIb2ZmZXJfaWQGdWludDY0C2RlbHRlbXBsYXRlAAMRYXV0aG9yaXplZF9lZGl0b3IEbmFtZQ9jb2xsZWN0aW9uX25hbWUEbmFtZQt0ZW1wbGF0ZV9pZAVpbnQzMg9leHRlbmRlZF9zeW1ib2wAAgNzeW0Gc3ltYm9sCGNvbnRyYWN0BG5hbWUMZXh0ZW5kc2NoZW1hAAQRYXV0aG9yaXplZF9lZGl0b3IEbmFtZQ9jb2xsZWN0aW9uX25hbWUEbmFtZQtzY2hlbWFfbmFtZQRuYW1lF3NjaGVtYV9mb3JtYXRfZXh0ZW5zaW9uCEZPUk1BVFtdDGZvcmJpZG5vdGlmeQABD2NvbGxlY3Rpb25fbmFtZQRuYW1lBGluaXQAAAxsb2NrdGVtcGxhdGUAAxFhdXRob3JpemVkX2VkaXRvcgRuYW1lD2NvbGxlY3Rpb25fbmFtZQRuYW1lC3RlbXBsYXRlX2lkBWludDMyDGxvZ2JhY2thc3NldAADC2Fzc2V0X293bmVyBG5hbWUIYXNzZXRfaWQGdWludDY0DGJhY2tlZF90b2tlbgVhc3NldAxsb2didXJuYXNzZXQACQthc3NldF9vd25lcgRuYW1lCGFzc2V0X2lkBnVpbnQ2NA9jb2xsZWN0aW9uX25hbWUEbmFtZQtzY2hlbWFfbmFtZQRuYW1lC3RlbXBsYXRlX2lkBWludDMyDWJhY2tlZF90b2tlbnMHYXNzZXRbXRJvbGRfaW1tdXRhYmxlX2RhdGENQVRUUklCVVRFX01BUBBvbGRfbXV0YWJsZV9kYXRhDUFUVFJJQlVURV9NQVAPYXNzZXRfcmFtX3BheWVyBG5hbWUHbG9nbWludAAKCGFzc2V0X2lkBnVpbnQ2NBFhdXRob3JpemVkX21pbnRlcgRuYW1lD2NvbGxlY3Rpb25fbmFtZQRuYW1lC3NjaGVtYV9uYW1lBG5hbWULdGVtcGxhdGVfaWQFaW50MzIPbmV3X2Fzc2V0X293bmVyBG5hbWUOaW1tdXRhYmxlX2RhdGENQVRUUklCVVRFX01BUAxtdXRhYmxlX2RhdGENQVRUUklCVVRFX01BUA1iYWNrZWRfdG9rZW5zB2Fzc2V0W10XaW1tdXRhYmxlX3RlbXBsYXRlX2RhdGENQVRUUklCVVRFX01BUAtsb2duZXdvZmZlcgAGCG9mZmVyX2lkBnVpbnQ2NAZzZW5kZXIEbmFtZQlyZWNpcGllbnQEbmFtZRBzZW5kZXJfYXNzZXRfaWRzCHVpbnQ2NFtdE3JlY2lwaWVudF9hc3NldF9pZHMIdWludDY0W10EbWVtbwZzdHJpbmcLbG9nbmV3dGVtcGwACAt0ZW1wbGF0ZV9pZAVpbnQzMhJhdXRob3JpemVkX2NyZWF0b3IEbmFtZQ9jb2xsZWN0aW9uX25hbWUEbmFtZQtzY2hlbWFfbmFtZQRuYW1lDHRyYW5zZmVyYWJsZQRib29sCGJ1cm5hYmxlBGJvb2wKbWF4X3N1cHBseQZ1aW50MzIOaW1tdXRhYmxlX2RhdGENQVRUUklCVVRFX01BUAtsb2dyYW1wYXllcgAEC2Fzc2V0X293bmVyBG5hbWUIYXNzZXRfaWQGdWludDY0DW9sZF9yYW1fcGF5ZXIEbmFtZQ1uZXdfcmFtX3BheWVyBG5hbWUKbG9nc2V0ZGF0YQAEC2Fzc2V0X293bmVyBG5hbWUIYXNzZXRfaWQGdWludDY0CG9sZF9kYXRhDUFUVFJJQlVURV9NQVAIbmV3X2RhdGENQVRUUklCVVRFX01BUAxsb2dzZXRkYXRhdGwABQ9jb2xsZWN0aW9uX25hbWUEbmFtZQtzY2hlbWFfbmFtZQRuYW1lC3RlbXBsYXRlX2lkBWludDMyCG9sZF9kYXRhDUFUVFJJQlVURV9NQVAIbmV3X2RhdGENQVRUUklCVVRFX01BUAtsb2d0cmFuc2ZlcgAFD2NvbGxlY3Rpb25fbmFtZQRuYW1lBGZyb20EbmFtZQJ0bwRuYW1lCWFzc2V0X2lkcwh1aW50NjRbXQRtZW1vBnN0cmluZwltaW50YXNzZXQACBFhdXRob3JpemVkX21pbnRlcgRuYW1lD2NvbGxlY3Rpb25fbmFtZQRuYW1lC3NjaGVtYV9uYW1lBG5hbWULdGVtcGxhdGVfaWQFaW50MzIPbmV3X2Fzc2V0X293bmVyBG5hbWUOaW1tdXRhYmxlX2RhdGENQVRUUklCVVRFX01BUAxtdXRhYmxlX2RhdGENQVRUUklCVVRFX01BUA50b2tlbnNfdG9fYmFjawdhc3NldFtdCG9mZmVyc19zAAcIb2ZmZXJfaWQGdWludDY0BnNlbmRlcgRuYW1lCXJlY2lwaWVudARuYW1lEHNlbmRlcl9hc3NldF9pZHMIdWludDY0W10TcmVjaXBpZW50X2Fzc2V0X2lkcwh1aW50NjRbXQRtZW1vBnN0cmluZwlyYW1fcGF5ZXIEbmFtZRxwYWlyX3N0cmluZ19BVE9NSUNfQVRUUklCVVRFAAIDa2V5BnN0cmluZwV2YWx1ZRBBVE9NSUNfQVRUUklCVVRFC3BheW9mZmVycmFtAAIFcGF5ZXIEbmFtZQhvZmZlcl9pZAZ1aW50NjQLcmVkdGVtcGxtYXgABBFhdXRob3JpemVkX2VkaXRvcgRuYW1lD2NvbGxlY3Rpb25fbmFtZQRuYW1lC3RlbXBsYXRlX2lkBWludDMyDm5ld19tYXhfc3VwcGx5BnVpbnQzMgxyZWplY3RhdXN3YXAAAQ9jb2xsZWN0aW9uX25hbWUEbmFtZQpyZW1jb2xhdXRoAAIPY29sbGVjdGlvbl9uYW1lBG5hbWURYWNjb3VudF90b19yZW1vdmUEbmFtZQxyZW1ub3RpZnlhY2MAAg9jb2xsZWN0aW9uX25hbWUEbmFtZRFhY2NvdW50X3RvX3JlbW92ZQRuYW1lDnNjaGVtYV90eXBlc19zAAILc2NoZW1hX25hbWUEbmFtZQtmb3JtYXRfdHlwZQ1GT1JNQVRfVFlQRVtdCXNjaGVtYXNfcwACC3NjaGVtYV9uYW1lBG5hbWUGZm9ybWF0CEZPUk1BVFtdDHNldGFzc2V0ZGF0YQAEEWF1dGhvcml6ZWRfZWRpdG9yBG5hbWULYXNzZXRfb3duZXIEbmFtZQhhc3NldF9pZAZ1aW50NjQQbmV3X211dGFibGVfZGF0YQ1BVFRSSUJVVEVfTUFQCnNldGNvbGRhdGEAAg9jb2xsZWN0aW9uX25hbWUEbmFtZQRkYXRhDUFUVFJJQlVURV9NQVAMc2V0bGFzdHBheWVyAAIFb3duZXIEbmFtZQ9jb2xsZWN0aW9uX25hbWUEbmFtZQxzZXRtYXJrZXRmZWUAAg9jb2xsZWN0aW9uX25hbWUEbmFtZQptYXJrZXRfZmVlB2Zsb2F0NjQLc2V0cmFtcGF5ZXIAAgluZXdfcGF5ZXIEbmFtZQhhc3NldF9pZAZ1aW50NjQMc2V0c2NoZW1hdHlwAAQRYXV0aG9yaXplZF9lZGl0b3IEbmFtZQ9jb2xsZWN0aW9uX25hbWUEbmFtZQtzY2hlbWFfbmFtZQRuYW1lEnNjaGVtYV9mb3JtYXRfdHlwZQ1GT1JNQVRfVFlQRVtdDHNldHRlbXBsZGF0YQAEEWF1dGhvcml6ZWRfZWRpdG9yBG5hbWUPY29sbGVjdGlvbl9uYW1lBG5hbWULdGVtcGxhdGVfaWQFaW50MzIQbmV3X211dGFibGVfZGF0YQ1BVFRSSUJVVEVfTUFQCnNldHZlcnNpb24AAQtuZXdfdmVyc2lvbgZzdHJpbmcTdGVtcGxhdGVfbXV0YWJsZXNfcwADC3RlbXBsYXRlX2lkBWludDMyC3NjaGVtYV9uYW1lBG5hbWUXbXV0YWJsZV9zZXJpYWxpemVkX2RhdGEHdWludDhbXQt0ZW1wbGF0ZXNfcwAHC3RlbXBsYXRlX2lkBWludDMyC3NjaGVtYV9uYW1lBG5hbWUMdHJhbnNmZXJhYmxlBGJvb2wIYnVybmFibGUEYm9vbAptYXhfc3VwcGx5BnVpbnQzMg1pc3N1ZWRfc3VwcGx5BnVpbnQzMhlpbW11dGFibGVfc2VyaWFsaXplZF9kYXRhB3VpbnQ4W10OdG9rZW5jb25maWdzX3MAAghzdGFuZGFyZARuYW1lB3ZlcnNpb24Gc3RyaW5nCHRyYW5zZmVyAAQEZnJvbQRuYW1lAnRvBG5hbWUJYXNzZXRfaWRzCHVpbnQ2NFtdBG1lbW8Gc3RyaW5nCHdpdGhkcmF3AAIFb3duZXIEbmFtZRF0b2tlbl90b193aXRoZHJhdwVhc3NldC9QDcfa5KoQMgxhY2NlcHRhdXN3YXAAAK5ai+aqEDILYWNjZXB0b2ZmZXIAAEDL2kSKUjIKYWRkY29sYXV0aAAwFaR5TYpSMgxhZGRjb25mdG9rZW4AgJDxy2U6UzIMYWRkbm90aWZ5YWNjAJBdUpGi6WQyDGFkbWluY29sZWRpdABAq0oKTU3nNAxhbm5vdW5jZWRlcG8AAADICmMDkTkJYmFja2Fzc2V0AAAAyApjM68+CWJ1cm5hc3NldAAArlqLRoWmQQtjYW5jZWxvZmZlcgBQDcfaqGzURQxjcmVhdGVhdXN3YXAAAACIFKls1EUJY3JlYXRlY29sAACuWouqbNRFC2NyZWF0ZW9mZmVyAGCkagirbNRFDGNyZWF0ZXNjaGVtYQAAYpUqq2zURQtjcmVhdGV0ZW1wbAAgYpUqq2zURQxjcmVhdGV0ZW1wbDIAcNVaVE0XkUoMZGVjbGluZW9mZmVyAABUNrFKlaNKC2RlbHRlbXBsYXRlAGCkaginqXJXDGV4dGVuZHNjaGVtYQDgl8t0JncuXQxmb3JiaWRub3RpZnkAAAAAAACQ3XQEaW5pdACgsolVqgwRjQxsb2NrdGVtcGxhdGUAkBXGBiJzGI0MbG9nYmFja2Fzc2V0AJAVxmZefRiNDGxvZ2J1cm5hc3NldAAAAAAgTycZjQdsb2dtaW50AACuWotyNRmNC2xvZ25ld29mZmVyAABilSpzNRmNC2xvZ25ld3RlbXBsAACu8qZKcxmNC2xvZ3JhbXBheWVyAACAySZlhRmNCmxvZ3NldGRhdGEAELPJJmWFGY0MbG9nc2V0ZGF0YXRsAACuWniamxmNC2xvZ3RyYW5zZmVyAAAAyApjk6eTCW1pbnRhc3NldAAApLlXrUW9qQtwYXlvZmZlcnJhbQAAupGxSpWTugtyZWR0ZW1wbG1heABQDcfaZKSeugxyZWplY3RhdXN3YXAAAEDL2kSKpLoKcmVtY29sYXV0aACAkPHLZTqlugxyZW1ub3RpZnlhY2MAYLJJWWFsssIMc2V0YXNzZXRkYXRhAACAySZFirLCCnNldGNvbGRhdGEAcJU3NWMTs8IMc2V0bGFzdHBheWVyAKDUygpeI7PCDHNldG1hcmtldGZlZQAArvKmSnOzwgtzZXRyYW1wYXllcgBQfTZSNYSzwgxzZXRzY2hlbWF0eXAAYLJJsUqVs8IMc2V0dGVtcGxkYXRhAADApA5ftbPCCnNldHZlcnNpb24AAAAAVy08zc0IdHJhbnNmZXIAAAAA3NzUsuMId2l0aGRyYXcACwAAAADgrDA2A2k2NAAACGFzc2V0c19zAHA1HF/asjYDaTY0AAAOYXV0aG9yX3N3YXBzX3MAAABYoWmiOQNpNjQAAApiYWxhbmNlc19zAPCkLiMVI0UDaTY0AAANY29sbGVjdGlvbnNfcwAAAAAwtyZFA2k2NAAACGNvbmZpZ19zAAAAAOCr1qIDaTY0AAAIb2ZmZXJzX3MAAAAAG6kawgNpNjQAAAlzY2hlbWFzX3MAsKo+G6kawgNpNjQAAA5zY2hlbWFfdHlwZXNfcwAAwCqbWKXKA2k2NAAAC3RlbXBsYXRlc19zAIDAKptYpcoDaTY0AAATdGVtcGxhdGVfbXV0YWJsZXNfc4CZW5OiqSDNA2k2NAAADnRva2VuY29uZmlnc19zAAAAAcIBdmFyaWFudF9pbnQ4X2ludDE2X2ludDMyX2ludDY0X3VpbnQ4X3VpbnQxNl91aW50MzJfdWludDY0X2Zsb2F0MzJfZmxvYXQ2NF9zdHJpbmdfSU5UOF9WRUNfSU5UMTZfVkVDX0lOVDMyX1ZFQ19JTlQ2NF9WRUNfVUlOVDhfVkVDX1VJTlQxNl9WRUNfVUlOVDMyX1ZFQ19VSU5UNjRfVkVDX0ZMT0FUX1ZFQ19ET1VCTEVfVkVDX1NUUklOR19WRUMWBGludDgFaW50MTYFaW50MzIFaW50NjQFdWludDgGdWludDE2BnVpbnQzMgZ1aW50NjQHZmxvYXQzMgdmbG9hdDY0BnN0cmluZwhJTlQ4X1ZFQwlJTlQxNl9WRUMJSU5UMzJfVkVDCUlOVDY0X1ZFQwlVSU5UOF9WRUMKVUlOVDE2X1ZFQwpVSU5UMzJfVkVDClVJTlQ2NF9WRUMJRkxPQVRfVkVDCkRPVUJMRV9WRUMKU1RSSU5HX1ZFQwA='
)
export const abi = ABI.from(abiBlob)
export class Contract extends BaseContract {
    constructor(args: PartialBy<ContractArgs, 'abi' | 'account'>) {
        super({
            client: args.client,
            abi: abi,
            account: args.account || Name.from('atomicassets'),
        })
    }
    action<T extends ActionNames>(
        name: T,
        data: ActionNameParams[T],
        options?: ActionOptions
    ): Action {
        return super.action(name, data, options)
    }
    table<T extends TableNames>(name: T, scope?: NameType): Table<RowType<T>> {
        return super.table(name, scope, TableMap[name])
    }
}
export interface ActionNameParams {
    acceptauswap: ActionParams.acceptauswap
    acceptoffer: ActionParams.acceptoffer
    addcolauth: ActionParams.addcolauth
    addconftoken: ActionParams.addconftoken
    addnotifyacc: ActionParams.addnotifyacc
    admincoledit: ActionParams.admincoledit
    announcedepo: ActionParams.announcedepo
    backasset: ActionParams.backasset
    burnasset: ActionParams.burnasset
    canceloffer: ActionParams.canceloffer
    createauswap: ActionParams.createauswap
    createcol: ActionParams.createcol
    createoffer: ActionParams.createoffer
    createschema: ActionParams.createschema
    createtempl: ActionParams.createtempl
    createtempl2: ActionParams.createtempl2
    declineoffer: ActionParams.declineoffer
    deltemplate: ActionParams.deltemplate
    extendschema: ActionParams.extendschema
    forbidnotify: ActionParams.forbidnotify
    init: ActionParams.init
    locktemplate: ActionParams.locktemplate
    logbackasset: ActionParams.logbackasset
    logburnasset: ActionParams.logburnasset
    logmint: ActionParams.logmint
    lognewoffer: ActionParams.lognewoffer
    lognewtempl: ActionParams.lognewtempl
    logrampayer: ActionParams.logrampayer
    logsetdata: ActionParams.logsetdata
    logsetdatatl: ActionParams.logsetdatatl
    logtransfer: ActionParams.logtransfer
    mintasset: ActionParams.mintasset
    payofferram: ActionParams.payofferram
    redtemplmax: ActionParams.redtemplmax
    rejectauswap: ActionParams.rejectauswap
    remcolauth: ActionParams.remcolauth
    remnotifyacc: ActionParams.remnotifyacc
    setassetdata: ActionParams.setassetdata
    setcoldata: ActionParams.setcoldata
    setlastpayer: ActionParams.setlastpayer
    setmarketfee: ActionParams.setmarketfee
    setrampayer: ActionParams.setrampayer
    setschematyp: ActionParams.setschematyp
    settempldata: ActionParams.settempldata
    setversion: ActionParams.setversion
    transfer: ActionParams.transfer
    withdraw: ActionParams.withdraw
}
export namespace ActionParams {
    export namespace Type {
        export interface FORMAT {
            name: string
            type: string
        }
        export interface pair_string_ATOMIC_ATTRIBUTE {
            key: string
            value: Type.variant_int8_int16_int32_int64_uint8_uint16_uint32_uint64_float32_float64_string_INT8_VEC_INT16_VEC_INT32_VEC_INT64_VEC_UINT8_VEC_UINT16_VEC_UINT32_VEC_UINT64_VEC_FLOAT_VEC_DOUBLE_VEC_STRING_VEC
        }
        export type variant_int8_int16_int32_int64_uint8_uint16_uint32_uint64_float32_float64_string_INT8_VEC_INT16_VEC_INT32_VEC_INT64_VEC_UINT8_VEC_UINT16_VEC_UINT32_VEC_UINT64_VEC_FLOAT_VEC_DOUBLE_VEC_STRING_VEC =

                | Int8Type
                | Int16Type
                | Int32Type
                | Int64Type
                | UInt8Type
                | UInt16Type
                | UInt32Type
                | UInt64Type
                | Float32Type
                | Float64Type
                | string
                | BytesType
                | Int16Type[]
                | Int32Type[]
                | Int64Type[]
                | UInt8Type[]
                | UInt16Type[]
                | UInt32Type[]
                | UInt64Type[]
                | Float32Type[]
                | Float64Type[]
                | string[]
                | Types.variant_int8_int16_int32_int64_uint8_uint16_uint32_uint64_float32_float64_string_INT8_VEC_INT16_VEC_INT32_VEC_INT64_VEC_UINT8_VEC_UINT16_VEC_UINT32_VEC_UINT64_VEC_FLOAT_VEC_DOUBLE_VEC_STRING_VEC
        export interface FORMAT_TYPE {
            name: string
            mediatype: string
            info: string
        }
    }
    export interface acceptauswap {
        collection_name: NameType
    }
    export interface acceptoffer {
        offer_id: UInt64Type
    }
    export interface addcolauth {
        collection_name: NameType
        account_to_add: NameType
    }
    export interface addconftoken {
        token_contract: NameType
        token_symbol: Asset.SymbolType
    }
    export interface addnotifyacc {
        collection_name: NameType
        account_to_add: NameType
    }
    export interface admincoledit {
        collection_format_extension: Type.FORMAT[]
    }
    export interface announcedepo {
        owner: NameType
        symbol_to_announce: Asset.SymbolType
    }
    export interface backasset {
        payer: NameType
        asset_owner: NameType
        asset_id: UInt64Type
        token_to_back: AssetType
    }
    export interface burnasset {
        asset_owner: NameType
        asset_id: UInt64Type
    }
    export interface canceloffer {
        offer_id: UInt64Type
    }
    export interface createauswap {
        collection_name: NameType
        new_author: NameType
        owner: boolean
    }
    export interface createcol {
        author: NameType
        collection_name: NameType
        allow_notify: boolean
        authorized_accounts: NameType[]
        notify_accounts: NameType[]
        market_fee: Float64Type
        data: Type.pair_string_ATOMIC_ATTRIBUTE[]
    }
    export interface createoffer {
        sender: NameType
        recipient: NameType
        sender_asset_ids: UInt64Type[]
        recipient_asset_ids: UInt64Type[]
        memo: string
    }
    export interface createschema {
        authorized_creator: NameType
        collection_name: NameType
        schema_name: NameType
        schema_format: Type.FORMAT[]
    }
    export interface createtempl {
        authorized_creator: NameType
        collection_name: NameType
        schema_name: NameType
        transferable: boolean
        burnable: boolean
        max_supply: UInt32Type
        immutable_data: Type.pair_string_ATOMIC_ATTRIBUTE[]
    }
    export interface createtempl2 {
        authorized_creator: NameType
        collection_name: NameType
        schema_name: NameType
        transferable: boolean
        burnable: boolean
        max_supply: UInt32Type
        immutable_data: Type.pair_string_ATOMIC_ATTRIBUTE[]
        mutable_data: Type.pair_string_ATOMIC_ATTRIBUTE[]
    }
    export interface declineoffer {
        offer_id: UInt64Type
    }
    export interface deltemplate {
        authorized_editor: NameType
        collection_name: NameType
        template_id: Int32Type
    }
    export interface extendschema {
        authorized_editor: NameType
        collection_name: NameType
        schema_name: NameType
        schema_format_extension: Type.FORMAT[]
    }
    export interface forbidnotify {
        collection_name: NameType
    }
    export interface init {}
    export interface locktemplate {
        authorized_editor: NameType
        collection_name: NameType
        template_id: Int32Type
    }
    export interface logbackasset {
        asset_owner: NameType
        asset_id: UInt64Type
        backed_token: AssetType
    }
    export interface logburnasset {
        asset_owner: NameType
        asset_id: UInt64Type
        collection_name: NameType
        schema_name: NameType
        template_id: Int32Type
        backed_tokens: AssetType[]
        old_immutable_data: Type.pair_string_ATOMIC_ATTRIBUTE[]
        old_mutable_data: Type.pair_string_ATOMIC_ATTRIBUTE[]
        asset_ram_payer: NameType
    }
    export interface logmint {
        asset_id: UInt64Type
        authorized_minter: NameType
        collection_name: NameType
        schema_name: NameType
        template_id: Int32Type
        new_asset_owner: NameType
        immutable_data: Type.pair_string_ATOMIC_ATTRIBUTE[]
        mutable_data: Type.pair_string_ATOMIC_ATTRIBUTE[]
        backed_tokens: AssetType[]
        immutable_template_data: Type.pair_string_ATOMIC_ATTRIBUTE[]
    }
    export interface lognewoffer {
        offer_id: UInt64Type
        sender: NameType
        recipient: NameType
        sender_asset_ids: UInt64Type[]
        recipient_asset_ids: UInt64Type[]
        memo: string
    }
    export interface lognewtempl {
        template_id: Int32Type
        authorized_creator: NameType
        collection_name: NameType
        schema_name: NameType
        transferable: boolean
        burnable: boolean
        max_supply: UInt32Type
        immutable_data: Type.pair_string_ATOMIC_ATTRIBUTE[]
    }
    export interface logrampayer {
        asset_owner: NameType
        asset_id: UInt64Type
        old_ram_payer: NameType
        new_ram_payer: NameType
    }
    export interface logsetdata {
        asset_owner: NameType
        asset_id: UInt64Type
        old_data: Type.pair_string_ATOMIC_ATTRIBUTE[]
        new_data: Type.pair_string_ATOMIC_ATTRIBUTE[]
    }
    export interface logsetdatatl {
        collection_name: NameType
        schema_name: NameType
        template_id: Int32Type
        old_data: Type.pair_string_ATOMIC_ATTRIBUTE[]
        new_data: Type.pair_string_ATOMIC_ATTRIBUTE[]
    }
    export interface logtransfer {
        collection_name: NameType
        from: NameType
        to: NameType
        asset_ids: UInt64Type[]
        memo: string
    }
    export interface mintasset {
        authorized_minter: NameType
        collection_name: NameType
        schema_name: NameType
        template_id: Int32Type
        new_asset_owner: NameType
        immutable_data: Type.pair_string_ATOMIC_ATTRIBUTE[]
        mutable_data: Type.pair_string_ATOMIC_ATTRIBUTE[]
        tokens_to_back: AssetType[]
    }
    export interface payofferram {
        payer: NameType
        offer_id: UInt64Type
    }
    export interface redtemplmax {
        authorized_editor: NameType
        collection_name: NameType
        template_id: Int32Type
        new_max_supply: UInt32Type
    }
    export interface rejectauswap {
        collection_name: NameType
    }
    export interface remcolauth {
        collection_name: NameType
        account_to_remove: NameType
    }
    export interface remnotifyacc {
        collection_name: NameType
        account_to_remove: NameType
    }
    export interface setassetdata {
        authorized_editor: NameType
        asset_owner: NameType
        asset_id: UInt64Type
        new_mutable_data: Type.pair_string_ATOMIC_ATTRIBUTE[]
    }
    export interface setcoldata {
        collection_name: NameType
        data: Type.pair_string_ATOMIC_ATTRIBUTE[]
    }
    export interface setlastpayer {
        owner: NameType
        collection_name: NameType
    }
    export interface setmarketfee {
        collection_name: NameType
        market_fee: Float64Type
    }
    export interface setrampayer {
        new_payer: NameType
        asset_id: UInt64Type
    }
    export interface setschematyp {
        authorized_editor: NameType
        collection_name: NameType
        schema_name: NameType
        schema_format_type: Type.FORMAT_TYPE[]
    }
    export interface settempldata {
        authorized_editor: NameType
        collection_name: NameType
        template_id: Int32Type
        new_mutable_data: Type.pair_string_ATOMIC_ATTRIBUTE[]
    }
    export interface setversion {
        new_version: string
    }
    export interface transfer {
        from: NameType
        to: NameType
        asset_ids: UInt64Type[]
        memo: string
    }
    export interface withdraw {
        owner: NameType
        token_to_withdraw: AssetType
    }
}
export namespace Types {
    @Variant.type(
        'variant_int8_int16_int32_int64_uint8_uint16_uint32_uint64_float32_float64_string_INT8_VEC_INT16_VEC_INT32_VEC_INT64_VEC_UINT8_VEC_UINT16_VEC_UINT32_VEC_UINT64_VEC_FLOAT_VEC_DOUBLE_VEC_STRING_VEC',
        [
            Int8,
            Int16,
            Int32,
            Int64,
            UInt8,
            UInt16,
            UInt32,
            UInt64,
            Float32,
            Float64,
            'string',
            Bytes,
            {type: Int16, array: true},
            {type: Int32, array: true},
            {type: Int64, array: true},
            {type: UInt8, array: true},
            {type: UInt16, array: true},
            {type: UInt32, array: true},
            {type: UInt64, array: true},
            {type: Float32, array: true},
            {type: Float64, array: true},
            'string[]',
        ]
    )
    export class variant_int8_int16_int32_int64_uint8_uint16_uint32_uint64_float32_float64_string_INT8_VEC_INT16_VEC_INT32_VEC_INT64_VEC_UINT8_VEC_UINT16_VEC_UINT32_VEC_UINT64_VEC_FLOAT_VEC_DOUBLE_VEC_STRING_VEC extends Variant {
        declare value:
            | Int8
            | Int16
            | Int32
            | Int64
            | UInt8
            | UInt16
            | UInt32
            | UInt64
            | Float32
            | Float64
            | string
            | Bytes
            | Int16[]
            | Int32[]
            | Int64[]
            | UInt8[]
            | UInt16[]
            | UInt32[]
            | UInt64[]
            | Float32[]
            | Float64[]
            | string[]
    }
    @Struct.type('FORMAT')
    export class FORMAT extends Struct {
        @Struct.field('string')
        name!: string
        @Struct.field('string')
        type!: string
    }
    @Struct.type('FORMAT_TYPE')
    export class FORMAT_TYPE extends Struct {
        @Struct.field('string')
        name!: string
        @Struct.field('string')
        mediatype!: string
        @Struct.field('string')
        info!: string
    }
    @Struct.type('acceptauswap')
    export class acceptauswap extends Struct {
        @Struct.field(Name)
        collection_name!: Name
    }
    @Struct.type('acceptoffer')
    export class acceptoffer extends Struct {
        @Struct.field(UInt64)
        offer_id!: UInt64
    }
    @Struct.type('addcolauth')
    export class addcolauth extends Struct {
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Name)
        account_to_add!: Name
    }
    @Struct.type('addconftoken')
    export class addconftoken extends Struct {
        @Struct.field(Name)
        token_contract!: Name
        @Struct.field(Asset.Symbol)
        token_symbol!: Asset.Symbol
    }
    @Struct.type('addnotifyacc')
    export class addnotifyacc extends Struct {
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Name)
        account_to_add!: Name
    }
    @Struct.type('admincoledit')
    export class admincoledit extends Struct {
        @Struct.field(FORMAT, {array: true})
        collection_format_extension!: FORMAT[]
    }
    @Struct.type('announcedepo')
    export class announcedepo extends Struct {
        @Struct.field(Name)
        owner!: Name
        @Struct.field(Asset.Symbol)
        symbol_to_announce!: Asset.Symbol
    }
    @Struct.type('assets_s')
    export class assets_s extends Struct {
        @Struct.field(UInt64)
        asset_id!: UInt64
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Name)
        schema_name!: Name
        @Struct.field(Int32)
        template_id!: Int32
        @Struct.field(Name)
        ram_payer!: Name
        @Struct.field(Asset, {array: true})
        backed_tokens!: Asset[]
        @Struct.field(UInt8, {array: true})
        immutable_serialized_data!: UInt8[]
        @Struct.field(UInt8, {array: true})
        mutable_serialized_data!: UInt8[]
    }
    @Struct.type('author_swaps_s')
    export class author_swaps_s extends Struct {
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Name)
        current_author!: Name
        @Struct.field(Name)
        new_author!: Name
        @Struct.field(UInt32)
        acceptance_date!: UInt32
    }
    @Struct.type('backasset')
    export class backasset extends Struct {
        @Struct.field(Name)
        payer!: Name
        @Struct.field(Name)
        asset_owner!: Name
        @Struct.field(UInt64)
        asset_id!: UInt64
        @Struct.field(Asset)
        token_to_back!: Asset
    }
    @Struct.type('balances_s')
    export class balances_s extends Struct {
        @Struct.field(Name)
        owner!: Name
        @Struct.field(Asset, {array: true})
        quantities!: Asset[]
    }
    @Struct.type('burnasset')
    export class burnasset extends Struct {
        @Struct.field(Name)
        asset_owner!: Name
        @Struct.field(UInt64)
        asset_id!: UInt64
    }
    @Struct.type('canceloffer')
    export class canceloffer extends Struct {
        @Struct.field(UInt64)
        offer_id!: UInt64
    }
    @Struct.type('collections_s')
    export class collections_s extends Struct {
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Name)
        author!: Name
        @Struct.field('bool')
        allow_notify!: boolean
        @Struct.field(Name, {array: true})
        authorized_accounts!: Name[]
        @Struct.field(Name, {array: true})
        notify_accounts!: Name[]
        @Struct.field(Float64)
        market_fee!: Float64
        @Struct.field(UInt8, {array: true})
        serialized_data!: UInt8[]
    }
    @Struct.type('extended_symbol')
    export class extended_symbol extends Struct {
        @Struct.field(Asset.Symbol)
        sym!: Asset.Symbol
        @Struct.field(Name)
        contract!: Name
    }
    @Struct.type('config_s')
    export class config_s extends Struct {
        @Struct.field(UInt64)
        asset_counter!: UInt64
        @Struct.field(Int32)
        template_counter!: Int32
        @Struct.field(UInt64)
        offer_counter!: UInt64
        @Struct.field(FORMAT, {array: true})
        collection_format!: FORMAT[]
        @Struct.field(extended_symbol, {array: true})
        supported_tokens!: extended_symbol[]
    }
    @Struct.type('createauswap')
    export class createauswap extends Struct {
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Name)
        new_author!: Name
        @Struct.field('bool')
        owner!: boolean
    }
    @Struct.type('pair_string_ATOMIC_ATTRIBUTE')
    export class pair_string_ATOMIC_ATTRIBUTE extends Struct {
        @Struct.field('string')
        key!: string
        @Struct.field(
            variant_int8_int16_int32_int64_uint8_uint16_uint32_uint64_float32_float64_string_INT8_VEC_INT16_VEC_INT32_VEC_INT64_VEC_UINT8_VEC_UINT16_VEC_UINT32_VEC_UINT64_VEC_FLOAT_VEC_DOUBLE_VEC_STRING_VEC
        )
        value!: variant_int8_int16_int32_int64_uint8_uint16_uint32_uint64_float32_float64_string_INT8_VEC_INT16_VEC_INT32_VEC_INT64_VEC_UINT8_VEC_UINT16_VEC_UINT32_VEC_UINT64_VEC_FLOAT_VEC_DOUBLE_VEC_STRING_VEC
    }
    @Struct.type('createcol')
    export class createcol extends Struct {
        @Struct.field(Name)
        author!: Name
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field('bool')
        allow_notify!: boolean
        @Struct.field(Name, {array: true})
        authorized_accounts!: Name[]
        @Struct.field(Name, {array: true})
        notify_accounts!: Name[]
        @Struct.field(Float64)
        market_fee!: Float64
        @Struct.field(pair_string_ATOMIC_ATTRIBUTE, {array: true})
        data!: pair_string_ATOMIC_ATTRIBUTE[]
    }
    @Struct.type('createoffer')
    export class createoffer extends Struct {
        @Struct.field(Name)
        sender!: Name
        @Struct.field(Name)
        recipient!: Name
        @Struct.field(UInt64, {array: true})
        sender_asset_ids!: UInt64[]
        @Struct.field(UInt64, {array: true})
        recipient_asset_ids!: UInt64[]
        @Struct.field('string')
        memo!: string
    }
    @Struct.type('createschema')
    export class createschema extends Struct {
        @Struct.field(Name)
        authorized_creator!: Name
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Name)
        schema_name!: Name
        @Struct.field(FORMAT, {array: true})
        schema_format!: FORMAT[]
    }
    @Struct.type('createtempl')
    export class createtempl extends Struct {
        @Struct.field(Name)
        authorized_creator!: Name
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Name)
        schema_name!: Name
        @Struct.field('bool')
        transferable!: boolean
        @Struct.field('bool')
        burnable!: boolean
        @Struct.field(UInt32)
        max_supply!: UInt32
        @Struct.field(pair_string_ATOMIC_ATTRIBUTE, {array: true})
        immutable_data!: pair_string_ATOMIC_ATTRIBUTE[]
    }
    @Struct.type('createtempl2')
    export class createtempl2 extends Struct {
        @Struct.field(Name)
        authorized_creator!: Name
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Name)
        schema_name!: Name
        @Struct.field('bool')
        transferable!: boolean
        @Struct.field('bool')
        burnable!: boolean
        @Struct.field(UInt32)
        max_supply!: UInt32
        @Struct.field(pair_string_ATOMIC_ATTRIBUTE, {array: true})
        immutable_data!: pair_string_ATOMIC_ATTRIBUTE[]
        @Struct.field(pair_string_ATOMIC_ATTRIBUTE, {array: true})
        mutable_data!: pair_string_ATOMIC_ATTRIBUTE[]
    }
    @Struct.type('declineoffer')
    export class declineoffer extends Struct {
        @Struct.field(UInt64)
        offer_id!: UInt64
    }
    @Struct.type('deltemplate')
    export class deltemplate extends Struct {
        @Struct.field(Name)
        authorized_editor!: Name
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Int32)
        template_id!: Int32
    }
    @Struct.type('extendschema')
    export class extendschema extends Struct {
        @Struct.field(Name)
        authorized_editor!: Name
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Name)
        schema_name!: Name
        @Struct.field(FORMAT, {array: true})
        schema_format_extension!: FORMAT[]
    }
    @Struct.type('forbidnotify')
    export class forbidnotify extends Struct {
        @Struct.field(Name)
        collection_name!: Name
    }
    @Struct.type('init')
    export class init extends Struct {}
    @Struct.type('locktemplate')
    export class locktemplate extends Struct {
        @Struct.field(Name)
        authorized_editor!: Name
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Int32)
        template_id!: Int32
    }
    @Struct.type('logbackasset')
    export class logbackasset extends Struct {
        @Struct.field(Name)
        asset_owner!: Name
        @Struct.field(UInt64)
        asset_id!: UInt64
        @Struct.field(Asset)
        backed_token!: Asset
    }
    @Struct.type('logburnasset')
    export class logburnasset extends Struct {
        @Struct.field(Name)
        asset_owner!: Name
        @Struct.field(UInt64)
        asset_id!: UInt64
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Name)
        schema_name!: Name
        @Struct.field(Int32)
        template_id!: Int32
        @Struct.field(Asset, {array: true})
        backed_tokens!: Asset[]
        @Struct.field(pair_string_ATOMIC_ATTRIBUTE, {array: true})
        old_immutable_data!: pair_string_ATOMIC_ATTRIBUTE[]
        @Struct.field(pair_string_ATOMIC_ATTRIBUTE, {array: true})
        old_mutable_data!: pair_string_ATOMIC_ATTRIBUTE[]
        @Struct.field(Name)
        asset_ram_payer!: Name
    }
    @Struct.type('logmint')
    export class logmint extends Struct {
        @Struct.field(UInt64)
        asset_id!: UInt64
        @Struct.field(Name)
        authorized_minter!: Name
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Name)
        schema_name!: Name
        @Struct.field(Int32)
        template_id!: Int32
        @Struct.field(Name)
        new_asset_owner!: Name
        @Struct.field(pair_string_ATOMIC_ATTRIBUTE, {array: true})
        immutable_data!: pair_string_ATOMIC_ATTRIBUTE[]
        @Struct.field(pair_string_ATOMIC_ATTRIBUTE, {array: true})
        mutable_data!: pair_string_ATOMIC_ATTRIBUTE[]
        @Struct.field(Asset, {array: true})
        backed_tokens!: Asset[]
        @Struct.field(pair_string_ATOMIC_ATTRIBUTE, {array: true})
        immutable_template_data!: pair_string_ATOMIC_ATTRIBUTE[]
    }
    @Struct.type('lognewoffer')
    export class lognewoffer extends Struct {
        @Struct.field(UInt64)
        offer_id!: UInt64
        @Struct.field(Name)
        sender!: Name
        @Struct.field(Name)
        recipient!: Name
        @Struct.field(UInt64, {array: true})
        sender_asset_ids!: UInt64[]
        @Struct.field(UInt64, {array: true})
        recipient_asset_ids!: UInt64[]
        @Struct.field('string')
        memo!: string
    }
    @Struct.type('lognewtempl')
    export class lognewtempl extends Struct {
        @Struct.field(Int32)
        template_id!: Int32
        @Struct.field(Name)
        authorized_creator!: Name
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Name)
        schema_name!: Name
        @Struct.field('bool')
        transferable!: boolean
        @Struct.field('bool')
        burnable!: boolean
        @Struct.field(UInt32)
        max_supply!: UInt32
        @Struct.field(pair_string_ATOMIC_ATTRIBUTE, {array: true})
        immutable_data!: pair_string_ATOMIC_ATTRIBUTE[]
    }
    @Struct.type('logrampayer')
    export class logrampayer extends Struct {
        @Struct.field(Name)
        asset_owner!: Name
        @Struct.field(UInt64)
        asset_id!: UInt64
        @Struct.field(Name)
        old_ram_payer!: Name
        @Struct.field(Name)
        new_ram_payer!: Name
    }
    @Struct.type('logsetdata')
    export class logsetdata extends Struct {
        @Struct.field(Name)
        asset_owner!: Name
        @Struct.field(UInt64)
        asset_id!: UInt64
        @Struct.field(pair_string_ATOMIC_ATTRIBUTE, {array: true})
        old_data!: pair_string_ATOMIC_ATTRIBUTE[]
        @Struct.field(pair_string_ATOMIC_ATTRIBUTE, {array: true})
        new_data!: pair_string_ATOMIC_ATTRIBUTE[]
    }
    @Struct.type('logsetdatatl')
    export class logsetdatatl extends Struct {
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Name)
        schema_name!: Name
        @Struct.field(Int32)
        template_id!: Int32
        @Struct.field(pair_string_ATOMIC_ATTRIBUTE, {array: true})
        old_data!: pair_string_ATOMIC_ATTRIBUTE[]
        @Struct.field(pair_string_ATOMIC_ATTRIBUTE, {array: true})
        new_data!: pair_string_ATOMIC_ATTRIBUTE[]
    }
    @Struct.type('logtransfer')
    export class logtransfer extends Struct {
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Name)
        from!: Name
        @Struct.field(Name)
        to!: Name
        @Struct.field(UInt64, {array: true})
        asset_ids!: UInt64[]
        @Struct.field('string')
        memo!: string
    }
    @Struct.type('mintasset')
    export class mintasset extends Struct {
        @Struct.field(Name)
        authorized_minter!: Name
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Name)
        schema_name!: Name
        @Struct.field(Int32)
        template_id!: Int32
        @Struct.field(Name)
        new_asset_owner!: Name
        @Struct.field(pair_string_ATOMIC_ATTRIBUTE, {array: true})
        immutable_data!: pair_string_ATOMIC_ATTRIBUTE[]
        @Struct.field(pair_string_ATOMIC_ATTRIBUTE, {array: true})
        mutable_data!: pair_string_ATOMIC_ATTRIBUTE[]
        @Struct.field(Asset, {array: true})
        tokens_to_back!: Asset[]
    }
    @Struct.type('offers_s')
    export class offers_s extends Struct {
        @Struct.field(UInt64)
        offer_id!: UInt64
        @Struct.field(Name)
        sender!: Name
        @Struct.field(Name)
        recipient!: Name
        @Struct.field(UInt64, {array: true})
        sender_asset_ids!: UInt64[]
        @Struct.field(UInt64, {array: true})
        recipient_asset_ids!: UInt64[]
        @Struct.field('string')
        memo!: string
        @Struct.field(Name)
        ram_payer!: Name
    }
    @Struct.type('payofferram')
    export class payofferram extends Struct {
        @Struct.field(Name)
        payer!: Name
        @Struct.field(UInt64)
        offer_id!: UInt64
    }
    @Struct.type('redtemplmax')
    export class redtemplmax extends Struct {
        @Struct.field(Name)
        authorized_editor!: Name
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Int32)
        template_id!: Int32
        @Struct.field(UInt32)
        new_max_supply!: UInt32
    }
    @Struct.type('rejectauswap')
    export class rejectauswap extends Struct {
        @Struct.field(Name)
        collection_name!: Name
    }
    @Struct.type('remcolauth')
    export class remcolauth extends Struct {
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Name)
        account_to_remove!: Name
    }
    @Struct.type('remnotifyacc')
    export class remnotifyacc extends Struct {
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Name)
        account_to_remove!: Name
    }
    @Struct.type('schema_types_s')
    export class schema_types_s extends Struct {
        @Struct.field(Name)
        schema_name!: Name
        @Struct.field(FORMAT_TYPE, {array: true})
        format_type!: FORMAT_TYPE[]
    }
    @Struct.type('schemas_s')
    export class schemas_s extends Struct {
        @Struct.field(Name)
        schema_name!: Name
        @Struct.field(FORMAT, {array: true})
        format!: FORMAT[]
    }
    @Struct.type('setassetdata')
    export class setassetdata extends Struct {
        @Struct.field(Name)
        authorized_editor!: Name
        @Struct.field(Name)
        asset_owner!: Name
        @Struct.field(UInt64)
        asset_id!: UInt64
        @Struct.field(pair_string_ATOMIC_ATTRIBUTE, {array: true})
        new_mutable_data!: pair_string_ATOMIC_ATTRIBUTE[]
    }
    @Struct.type('setcoldata')
    export class setcoldata extends Struct {
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(pair_string_ATOMIC_ATTRIBUTE, {array: true})
        data!: pair_string_ATOMIC_ATTRIBUTE[]
    }
    @Struct.type('setlastpayer')
    export class setlastpayer extends Struct {
        @Struct.field(Name)
        owner!: Name
        @Struct.field(Name)
        collection_name!: Name
    }
    @Struct.type('setmarketfee')
    export class setmarketfee extends Struct {
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Float64)
        market_fee!: Float64
    }
    @Struct.type('setrampayer')
    export class setrampayer extends Struct {
        @Struct.field(Name)
        new_payer!: Name
        @Struct.field(UInt64)
        asset_id!: UInt64
    }
    @Struct.type('setschematyp')
    export class setschematyp extends Struct {
        @Struct.field(Name)
        authorized_editor!: Name
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Name)
        schema_name!: Name
        @Struct.field(FORMAT_TYPE, {array: true})
        schema_format_type!: FORMAT_TYPE[]
    }
    @Struct.type('settempldata')
    export class settempldata extends Struct {
        @Struct.field(Name)
        authorized_editor!: Name
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Int32)
        template_id!: Int32
        @Struct.field(pair_string_ATOMIC_ATTRIBUTE, {array: true})
        new_mutable_data!: pair_string_ATOMIC_ATTRIBUTE[]
    }
    @Struct.type('setversion')
    export class setversion extends Struct {
        @Struct.field('string')
        new_version!: string
    }
    @Struct.type('template_mutables_s')
    export class template_mutables_s extends Struct {
        @Struct.field(Int32)
        template_id!: Int32
        @Struct.field(Name)
        schema_name!: Name
        @Struct.field(UInt8, {array: true})
        mutable_serialized_data!: UInt8[]
    }
    @Struct.type('templates_s')
    export class templates_s extends Struct {
        @Struct.field(Int32)
        template_id!: Int32
        @Struct.field(Name)
        schema_name!: Name
        @Struct.field('bool')
        transferable!: boolean
        @Struct.field('bool')
        burnable!: boolean
        @Struct.field(UInt32)
        max_supply!: UInt32
        @Struct.field(UInt32)
        issued_supply!: UInt32
        @Struct.field(UInt8, {array: true})
        immutable_serialized_data!: UInt8[]
    }
    @Struct.type('tokenconfigs_s')
    export class tokenconfigs_s extends Struct {
        @Struct.field(Name)
        standard!: Name
        @Struct.field('string')
        version!: string
    }
    @Struct.type('transfer')
    export class transfer extends Struct {
        @Struct.field(Name)
        from!: Name
        @Struct.field(Name)
        to!: Name
        @Struct.field(UInt64, {array: true})
        asset_ids!: UInt64[]
        @Struct.field('string')
        memo!: string
    }
    @Struct.type('withdraw')
    export class withdraw extends Struct {
        @Struct.field(Name)
        owner!: Name
        @Struct.field(Asset)
        token_to_withdraw!: Asset
    }
}
export const TableMap = {
    assets: Types.assets_s,
    authorswaps: Types.author_swaps_s,
    balances: Types.balances_s,
    collections: Types.collections_s,
    config: Types.config_s,
    offers: Types.offers_s,
    schemas: Types.schemas_s,
    schematypes: Types.schema_types_s,
    templates: Types.templates_s,
    templates2: Types.template_mutables_s,
    tokenconfigs: Types.tokenconfigs_s,
}
export interface TableTypes {
    assets: Types.assets_s
    authorswaps: Types.author_swaps_s
    balances: Types.balances_s
    collections: Types.collections_s
    config: Types.config_s
    offers: Types.offers_s
    schemas: Types.schemas_s
    schematypes: Types.schema_types_s
    templates: Types.templates_s
    templates2: Types.template_mutables_s
    tokenconfigs: Types.tokenconfigs_s
}
export type RowType<T> = T extends keyof TableTypes ? TableTypes[T] : any
export type ActionNames = keyof ActionNameParams
export type TableNames = keyof TableTypes
