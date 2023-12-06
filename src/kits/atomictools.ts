import type {Action, UInt64Type} from '@wharfkit/antelope'
import {Link} from '../objects'

import type * as AtomicToolsContract from '../contracts/atomictoolsx'
import type {AtomicUtility} from '../utility'

export class AtomicToolsKit {
    readonly utility: AtomicUtility

    constructor(utility: AtomicUtility) {
        this.utility = utility
    }

    async loadLink(linkId: UInt64Type): Promise<Link> {
        const data = await this.utility.atomicClient.atomictools.v1.get_link(linkId)

        return Link.from(data.data, this.utility)
    }

    announceLink(value: AtomicToolsContract.ActionParams.Announcelink): Action {
        return this.utility.toolsContract.action('announcelink', value)
    }
}
