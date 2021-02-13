namespace SpriteKind {
    export const Bad_Boss = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 6 6 . . . . . . . 
        . . . . . . . 6 6 . . . . . . . 
        . . . . . . . 6 6 . . . . . . . 
        . . . . . . . 6 6 . . . . . . . 
        . . . . . . 6 6 6 6 . . . . . . 
        . . . . . 6 6 6 6 6 6 . . . . . 
        . . . . . 6 6 6 6 6 6 . . . . . 
        . . . . . 2 6 6 6 6 2 . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . . 4 2 2 4 . . . . . . 
        . . . . . . . 4 4 . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        `, Hero, 0, -50)
    pause(1000)
})
sprites.onOverlap(SpriteKind.Bad_Boss, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    Boss.say(Boss_Life, 1000)
    Boss_Life += -1
    if (Boss_Life == 0) {
        game.over(true)
    }
})
function SetupBoss () {
    Boss = sprites.create(img`
        . . . 2 2 2 2 . . . . . . . . . 
        . . . 2 2 . 2 . . 2 2 2 . . . . 
        . . . . . . 2 . . 2 . 2 . 2 2 2 
        2 2 . . . . 2 . . 2 . . . 2 . 2 
        . 2 . . . . 2 . . 2 . . . 2 . . 
        . 2 . . 8 8 8 8 8 8 8 8 8 2 . . 
        . 2 2 2 8 8 8 8 8 8 8 8 8 . . . 
        . . . . 8 8 d 8 8 8 d 8 8 . . . 
        . . . . 8 8 8 8 8 8 8 8 8 . 2 . 
        . . . . 8 8 8 8 8 8 8 8 8 . 2 2 
        . . . . 8 8 8 5 5 5 8 8 8 . . 2 
        2 2 2 2 8 8 8 8 8 8 8 8 8 2 2 2 
        2 . . . 8 8 8 8 8 8 8 8 8 . . . 
        . 2 . . . . 2 . . . . 2 . . . . 
        . 2 . . 2 . 2 . . 2 2 2 . . . . 
        . 2 2 . 2 2 2 . . 2 . . . . . . 
        `, SpriteKind.Bad_Boss)
    Boss.setPosition(80, 25)
    Boss.setVelocity(20, 0)
    Boss.setBounceOnWall(true)
    Boss_Life = 3
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy(effects.fire, 100)
    sprite.destroy(effects.fire, 100)
})
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    sprite.destroy(effects.spray, 200)
    Moon_Damage += -10
    Hero.say(Moon_Damage, 1000)
    if (Moon_Damage == 0) {
        game.over(false)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.spray, 200)
})
let Enemy01: Sprite = null
let Boss_Life = 0
let Boss: Sprite = null
let projectile: Sprite = null
let Moon_Damage = 0
let Hero: Sprite = null
game.showLongText("Planet Donut is being attacked by the Evil Villain Dr Doom from Planet Pizza.... you are our last hope!", DialogLayout.Center)
tiles.setTilemap(tilemap`level1`)
Hero = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . b b . . . . . . . 
    . . . . . . b 8 8 b . . . . . . 
    . . . . . . b 8 8 b . . . . . . 
    . . . . . . b 8 8 b . . . . . . 
    . . . . . . b e e b . . . . . . 
    b . . . . b 8 e e 8 b . . . . b 
    b . . . . 9 9 8 8 9 9 . . . . b 
    b . . . 9 9 8 8 8 8 9 9 . . . b 
    b 9 . . 9 8 8 8 8 8 8 9 . . 9 b 
    b 9 8 8 8 8 8 8 8 8 8 8 8 8 9 b 
    9 9 8 8 5 9 9 9 9 9 9 5 8 8 9 9 
    9 8 8 5 9 4 3 2 2 3 4 9 5 8 8 9 
    9 8 5 9 . 4 3 2 2 3 4 . 9 5 8 9 
    9 9 9 9 . . 4 3 3 4 . . 9 9 9 9 
    . . . . . . . 4 4 . . . . . . . 
    `, SpriteKind.Player)
Hero.setPosition(80, 100)
controller.moveSprite(Hero, 100, 0)
Hero.setStayInScreen(true)
info.setLife(3)
Moon_Damage = 100
SetupBoss()
game.onUpdateInterval(5000, function () {
    Enemy01 = sprites.create(img`
        . . . . . . b b b b . . . . . . 
        . . . . . . b 4 4 4 b . . . . . 
        . . . . . . b b 4 4 4 b . . . . 
        . . . . . b 4 b b b 4 4 b . . . 
        . . . . b d 5 5 5 4 b 4 4 b . . 
        . . . . b 3 2 3 5 5 4 e 4 4 b . 
        . . . b d 2 2 2 5 7 5 4 e 4 4 e 
        . . . b 5 3 2 3 5 5 5 5 e e e e 
        . . b d 7 5 5 5 3 2 3 5 5 e e e 
        . . b 5 5 5 5 5 2 2 2 5 5 d e e 
        . b 3 2 3 5 7 5 3 2 3 5 d d e 4 
        . b 2 2 2 5 5 5 5 5 5 d d e 4 . 
        b d 3 2 d 5 5 5 d d d 4 4 . . . 
        b 5 5 5 5 d d 4 4 4 4 . . . . . 
        4 d d d 4 4 4 . . . . . . . . . 
        4 4 4 4 . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    Enemy01.setPosition(randint(40, 120), 10)
    Enemy01.setVelocity(randint(-20, 20), 20)
})
game.onUpdateInterval(2000, function () {
    Enemy01 = sprites.create(img`
        . . . . . . . . . . . . b b 4 4 
        . . . . . . . . . . b b d 5 d 4 
        . . . . . . . . b b 3 2 3 5 d 4 
        . . . . . . b b d 5 2 2 2 5 d 4 
        . . . . b b d 5 7 5 3 2 d 5 4 . 
        . . . b d 3 2 3 5 5 5 5 5 d 4 . 
        b b b 4 5 2 2 2 5 5 7 5 5 d 4 . 
        b 4 b b 5 3 2 3 5 5 5 5 5 4 . . 
        b 4 4 b 5 5 5 5 3 2 3 5 d 4 . . 
        b 4 4 b 4 5 7 5 2 2 2 5 d 4 . . 
        . b 4 4 b 4 5 5 3 2 3 5 d 4 . . 
        . . b 4 4 e 4 5 5 5 5 d 4 . . . 
        . . . b 4 4 e e 5 5 d d 4 . . . 
        . . . . b 4 4 e e d d e . . . . 
        . . . . . b 4 e e e e 4 . . . . 
        . . . . . . e e e e 4 . . . . . 
        `, SpriteKind.Enemy)
    Enemy01.setPosition(Boss.x, Boss.y)
    Enemy01.setVelocity(0, 20)
})
