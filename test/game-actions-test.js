import * as gameActions from '../src/actions/gameActions'

describe('game actions', () => {
  it('should create an action with a type of "EXECUTE_ROUND"', () => {
    const expectedAction = {
      type: 'EXECUTE_ROUND'
    }
    expect(gameActions.executeRound()).toEqual(expectedAction)
  })

  it('should create an action with a type of "RESET_GAME"', () => {
    const expectedAction = {
      type: 'RESET_GAME'
    }
    expect(gameActions.resetGame()).toEqual(expectedAction)
  })
})