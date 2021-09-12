// グローバルに展開
phina.globalize();
// 定数
var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 960;

const jumpingcount = 10;
var dummy;
var dummy6;
var onGround = jumpingcount;

/*
 * メインシーン
 */
phina.define("MainScene", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    // 親クラス初期化
    this.superInit();
    // 背景色
    this.backgroundColor = 'black';
    // Box2d用レイヤー作成
    var layer = Box2dLayer({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    }).addChildTo(this);
    // ボール
    var ball = CircleShape().addChildTo(this);
    //ball.draggable;
    ball.setPosition(this.gridX.span(2), this.gridY.center());
    // Box2dのデバッグ表示が見えるようにする
    ball.alpha = 0.5;
    // Box2dオブジェクトを作成してballにアタッチ
    dummy = layer.createBody({
      type: 'dynamic', 
      //shape: 'circle',
      shape: 'box',//'circle',
    }).attachTo(ball);
    // 床
    var floor = RectangleShape({
      width: SCREEN_WIDTH,
      height: 32,
    }).addChildTo(this);
    floor.setPosition(this.gridX.center(), this.gridY.span(15));
    // Box2dのデバッグ表示が見えるようにする
    floor.alpha = 0.5;
    // Box2dオブジェクトを作成してfloorにアタッチ
    layer.createBody({
      type: 'static', 
      shape: 'box',
    }).attachTo(floor).body.SetAngle(Math.degToRad(0));
    // 床2
    var floor2 = RectangleShape({
      width: 32,
      height: SCREEN_HEIGHT,
    }).addChildTo(this);
    floor2.setPosition(this.gridX.span(0), this.gridY.center());
    // Box2dのデバッグ表示が見えるようにする
    floor2.alpha = 0.5;
    // Box2dオブジェクトを作成してfloor2にアタッチ
    layer.createBody({
      type: 'static', 
      shape: 'box',
    }).attachTo(floor2).body.SetAngle(Math.degToRad(0));
    // 床3
    var floor3 = RectangleShape({
      width: 32,
      height: SCREEN_HEIGHT,
    }).addChildTo(this);
    floor3.setPosition(this.gridX.span(16), this.gridY.center());
    // Box2dのデバッグ表示が見えるようにする
    floor3.alpha = 0.5;
    // Box2dオブジェクトを作成してfloor3にアタッチ
    layer.createBody({
      type: 'static', 
      shape: 'box',
    }).attachTo(floor3).body.SetAngle(Math.degToRad(0));

    // 床4
    var floor4 = RectangleShape({
      width: 128,
      height: 32,
    }).addChildTo(this);
    floor4.setPosition(this.gridX.span(5), this.gridY.span(11));
    // Box2dのデバッグ表示が見えるようにする
    floor4.alpha = 0.5;
    // Box2dオブジェクトを作成してfloor3にアタッチ
    layer.createBody({
      type: 'static', 
      shape: 'box',
    }).attachTo(floor4).body.SetAngle(Math.degToRad(0));
    // 床5
    var floor5 = RectangleShape({
      width: 128,
      height: 32,
    }).addChildTo(this);
    floor5.setPosition(this.gridX.span(11), this.gridY.span(11));
    // Box2dのデバッグ表示が見えるようにする
    floor5.alpha = 0.5;
    // Box2dオブジェクトを作成してfloor3にアタッチ
    layer.createBody({
      type: 'static', 
      shape: 'box',
    }).attachTo(floor5).body.SetAngle(Math.degToRad(0));
    
    // 床6
    this.floor6 = RectangleShape({
      width: 128,
      height: 32,
    }).addChildTo(this);
    this.floor6.setPosition(this.gridX.span(8), this.gridY.span(7));
    // Box2dのデバッグ表示が見えるようにする
    this.floor6.alpha = 0.5;
    // Box2dオブジェクトを作成してfloor3にアタッチ
    dummy6 = layer.createBody({
      type: 'kinematic', 
      shape: 'box',
    }).attachTo(this.floor6);
    //dummy6.body.SetAngle(Math.degToRad(0));
    this.d6 = 1;

    this.aaaa = Label().addChildTo(this);
    this.aaaa.setPosition(620,20);
    this.aaaa.origin.set(1,0);
    this.aaaa.text = "aaaaaa";
    this.aaaa.fill = "#fff";

    this.aaab = Label().addChildTo(this);
    this.aaab.setPosition(620,50);
    this.aaab.origin.set(1,0);
    this.aaab.text = "aaaaaa";
    this.aaab.fill = "#fff";

  },
  update: function(app) {
    // キー入力取得
    const key = app.keyboard;
    // 物体を操作
    if(key.getKey("right") && dummy.body.GetLinearVelocity().x < 5){
      dummy.body.SetAwake(true);
      dummy.body.ApplyImpulse(new b2.Vec2(1,0), dummy.body.GetWorldCenter());
      //else dummy.body.ApplyImpulse(new b2.Vec2(0.5, 0), dummy.body.GetWorldCenter());
      //dummy.body.SetLinearVelocity(new b2.Vec2(5, dummy.body.GetLinearVelocity().y));
      //dummy.body.SetAngle(0);
    }
    if(key.getKey("left") && dummy.body.GetLinearVelocity().x > -5){
      dummy.body.SetAwake(true);
      dummy.body.ApplyImpulse(new b2.Vec2(-1,0), dummy.body.GetWorldCenter());
      //else dummy.body.ApplyImpulse(new b2.Vec2(-0.5, 0), dummy.body.GetWorldCenter());
      //dummy.body.SetLinearVelocity(new b2.Vec2(-5, dummy.body.GetLinearVelocity().y));
      //dummy.body.SetAngle(0);
    }
    /*
    if(!onGround && !key.getKey("right") && !key.getKey("left")){
      if(dummy.body.GetLinearVelocity().x > 0.5) dummy.body.ApplyImpulse(new b2.Vec2(-0.5,0), dummy.body.GetWorldCenter());
      else if(dummy.body.GetLinearVelocity().x < -0.5) dummy.body.ApplyImpulse(new b2.Vec2(0.5,0), dummy.body.GetWorldCenter());
      else dummy.body.SetLinearVelocity(new b2.Vec2(0, dummy.body.GetLinearVelocity().y));
    }
    */

    if(key.getKey("space") && onGround){
      dummy.body.SetAwake(true);
      //dummy.body.ApplyImpulse(new b2.Vec2(0,-3), dummy.body.GetWorldCenter());
      if(onGround == jumpingcount) dummy.body.SetLinearVelocity(new b2.Vec2(dummy.body.GetLinearVelocity().x, -15));
      else dummy.body.ApplyImpulse(new b2.Vec2(0,-2), dummy.body.GetWorldCenter());
      onGround-=1;
      //dummy.body.SetAngle(0);
    }//else{
      //dummy.body.SetAwake(true);
      //dummy.body.SetLinearVelocity(new b2.Vec2(0, dummy.body.GetLinearVelocity().y));
    //}

    //if(dummy.body.GetAngle() != 0){
      //dummy.body.m_sweep.a = 0;
      //dummy.body.m_sweep.a0 = 0;
    //}

    var aaaaa = Math.abs(dummy.body.GetLinearVelocity().y);
    if(aaaaa < 0.0001){
      onGround=jumpingcount;
      console.log("onGround");
      //dummy.body.SetAngle(0);
    }else if(!key.getKey("space")) onGround = 0;

    var f6x = dummy6.body.GetLinearVelocity().x;
    if(f6x > -3 && f6x < 3){
      //dummy6.body.ApplyImpulse(new b2.Vec2(2*this.d6,0), dummy6.body.GetWorldCenter());
      dummy6.body.SetLinearVelocity(new b2.Vec2(2*this.d6, 0));
    }
    if(this.floor6.x < this.gridX.span(5)) this.d6 = 1;
    if(this.floor6.x > this.gridX.span(11)) this.d6 = -1;

    this.aaaa.text = f6x;
    this.aaab.text = onGround;
  }
});
/*
 * メイン処理
 */
phina.main(function() {
  // アプリケーションを生成
  var app = GameApp({
    fps: 60,
    // MainScene から開始
    startLabel: 'main',
  });
  // fps表示
  //app.enableStats();
  // 実行
  app.run();
});