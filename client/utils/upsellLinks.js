export const HALFPRICE = 'half'
export const FULLPRICE = 'full'

export const subscriptionPage = {
  [HALFPRICE]: '/subscriptions/games/lp8J6KQ.html',
  [FULLPRICE]: '/subscriptions/games/lp897H9.html',
}

export const campaigns = {
  daily: { [HALFPRICE]: '4QHQJ', [FULLPRICE]: '4QHQ6' },
  archive: { [HALFPRICE]: '4QHQR', [FULLPRICE]: '4QHQF' },
  gameplay: { [HALFPRICE]: '4R67Y', [FULLPRICE]: '4R67W' },
  congrats: { [HALFPRICE]: '4XKYF', [FULLPRICE]: '4XKYJ' },
  other: { [HALFPRICE]: '4QHQL', [FULLPRICE]: '4QHQ8' },
}

export const qualifiesForHalfOff = user => user.hasDigi || user.hasHd

/**
 * create a subscription url given a user and a context
 */
export const createSubscriptionUrl = (user, context) => {
  const priceKey = qualifiesForHalfOff(user) ? HALFPRICE : FULLPRICE
  const page = subscriptionPage[priceKey]
  const campaign = campaigns[context] && campaigns[context][priceKey]
  return campaign ? `${page}?campaignId=${campaign}` : page
}
