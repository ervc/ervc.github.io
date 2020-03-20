class Player {
  constructor(name) {
    this.name = name;
    this.isFirst = false;
    this.canCall = true;
    this.doesCall = false;
    this.cupStreak = 0;
    this.madeThisTurn = false;
    this.isOnFire = false;
    this.cupsMade = 0;
    this.totalShots = 0;
  }
}