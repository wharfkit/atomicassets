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

    announceAuction(value: AtomicMarketContract.Types.Announceauct): Action {
        return this.utility.marketContract.action('announceauct', value)
    }

    async loadSale(saleId: UInt64Type): Promise<Sale> {
        const data = await this.utility.atomicClient.atomicmarket.v1.get_sale(saleId)

        return Sale.from(data.data, this.utility)
    }

    announceSale(value: AtomicMarketContract.Types.Announcesale): Action {
        return this.utility.marketContract.action('announcesale', value)
    }

    async loadBuyoffer(buyofferId: UInt64Type): Promise<Buyoffer> {
        const data = await this.utility.atomicClient.atomicmarket.v1.get_buyoffer(buyofferId)

        return Buyoffer.from(data.data, this.utility)
    }

    createBuyo(value: AtomicMarketContract.Types.Createbuyo): Action {
        return this.utility.marketContract.action('createbuyo', value)
    }

    addBonusfeeCounter(value: AtomicMarketContract.Types.Addbonusfee): Action {
        return this.utility.marketContract.action('addafeectr', value)
    }

    addBonusfee(value: AtomicMarketContract.Types.Addbonusfee): Action {
        return this.utility.marketContract.action('addbonusfee', value)
    }

    delBonusfee(value: AtomicMarketContract.Types.Delbonusfee): Action {
        return this.utility.marketContract.action('delbonusfee', value)
    }

    stopBonusfee(value: AtomicMarketContract.Types.Stopbonusfee): Action {
        return this.utility.marketContract.action('stopbonusfee', value)
    }

    addConfToken(value: AtomicMarketContract.Types.Addconftoken): Action {
        return this.utility.marketContract.action('addconftoken', value)
    }

    addDelphi(value: AtomicMarketContract.Types.Adddelphi): Action {
        return this.utility.marketContract.action('adddelphi', value)
    }

    registerMarketplace(value: AtomicMarketContract.Types.Regmarket): Action {
        return this.utility.marketContract.action('regmarket', value)
    }

    setMarketfee(value: AtomicMarketContract.Types.Setmarketfee): Action {
        return this.utility.marketContract.action('setmarketfee', value)
    }

    setMinbidinc(value: AtomicMarketContract.Types.Setminbidinc): Action {
        return this.utility.marketContract.action('setminbidinc', value)
    }

    setVersion(value: AtomicMarketContract.Types.Setversion): Action {
        return this.utility.marketContract.action('setversion', value)
    }

    withdraw(value: AtomicMarketContract.Types.Withdraw): Action {
        return this.utility.marketContract.action('withdraw', value)
    }
}
