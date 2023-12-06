import type {Action, UInt64Type} from '@wharfkit/antelope'
import {Auction, Buyoffer, Sale} from '../objects'

import type * as AtomicMarketContract from '../contracts/atomicmarket'
import type {AtomicUtility} from '../utility'

export class AtomicMarketKit {
    readonly utility: AtomicUtility

    constructor(utility: AtomicUtility) {
        this.utility = utility
    }

    async loadAuction(auctionId: UInt64Type): Promise<Auction> {
        const data = await this.utility.atomicClient.atomicmarket.v1.get_auction(auctionId)

        return Auction.from(data.data, this.utility)
    }

    announceAuction(value: AtomicMarketContract.ActionParams.Announceauct): Action {
        return this.utility.marketContract.action('announceauct', value)
    }

    async loadSale(saleId: UInt64Type): Promise<Sale> {
        const data = await this.utility.atomicClient.atomicmarket.v1.get_sale(saleId)

        return Sale.from(data.data, this.utility)
    }

    announceSale(value: AtomicMarketContract.ActionParams.Announcesale): Action {
        return this.utility.marketContract.action('announcesale', value)
    }

    async loadBuyoffer(buyofferId: UInt64Type): Promise<Buyoffer> {
        const data = await this.utility.atomicClient.atomicmarket.v1.get_buyoffer(buyofferId)

        return Buyoffer.from(data.data, this.utility)
    }

    createBuyo(value: AtomicMarketContract.ActionParams.Createbuyo): Action {
        return this.utility.marketContract.action('createbuyo', value)
    }

    addBonusfeeCounter(value: AtomicMarketContract.ActionParams.Addbonusfee): Action {
        return this.utility.marketContract.action('addafeectr', value)
    }

    addBonusfee(value: AtomicMarketContract.ActionParams.Addbonusfee): Action {
        return this.utility.marketContract.action('addbonusfee', value)
    }

    delBonusfee(value: AtomicMarketContract.ActionParams.Delbonusfee): Action {
        return this.utility.marketContract.action('delbonusfee', value)
    }

    stopBonusfee(value: AtomicMarketContract.ActionParams.Stopbonusfee): Action {
        return this.utility.marketContract.action('stopbonusfee', value)
    }

    addConfToken(value: AtomicMarketContract.ActionParams.Addconftoken): Action {
        return this.utility.marketContract.action('addconftoken', value)
    }

    addDelphi(value: AtomicMarketContract.ActionParams.Adddelphi): Action {
        return this.utility.marketContract.action('adddelphi', value)
    }

    registerMarketplace(value: AtomicMarketContract.ActionParams.Regmarket): Action {
        return this.utility.marketContract.action('regmarket', value)
    }

    setMarketfee(value: AtomicMarketContract.ActionParams.Setmarketfee): Action {
        return this.utility.marketContract.action('setmarketfee', value)
    }

    setMinbidinc(value: AtomicMarketContract.ActionParams.Setminbidinc): Action {
        return this.utility.marketContract.action('setminbidinc', value)
    }

    setVersion(value: AtomicMarketContract.ActionParams.Setversion): Action {
        return this.utility.marketContract.action('setversion', value)
    }

    withdraw(value: AtomicMarketContract.ActionParams.Withdraw): Action {
        return this.utility.marketContract.action('withdraw', value)
    }
}
