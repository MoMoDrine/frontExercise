import Mock from 'mockjs'

const Random = Mock.Random


let activityData = []

// 可自定义生成的个数
let cardData = {
  'code': 0,
  "message": "success!",
  'data': {
    'sumActivity': Random.natural(1, 100), // mock活动数
    'sumEnroll': Random.natural(1, 100),//mock报名总数
    'discheck': Random.natural(1, 100),//待审核
    'vip': Random.natural(1, 100),
  }

};
//data.push(template)
let sumActivity = function (item) {
  console.log(JSON.parse(item.body));
  if (JSON.parse(item.body).type === "sumActivity") {
    pushData(JSON.parse(item.body));
    return Mock.mock({
      'code': 0,
      "message": "success!",
      'data': activityData
    })
  }
};


Mock.mock('/vue-demo/api/getcarddata', 'get', cardData);
Mock.mock('/vue-demo/api/getsumactiivitydata', 'post', sumActivity)


function pushData(item) {
  activityData=[];
  for (let i = 0; i < item.limit; i++) {
    let temp = {
      'activityId': 'V' + Random.zip(),
      'activityName': Random.ctitle(),
      'activityLimitNumber': Random.natural(1, 100),
      'activityManager': Random.cfirst() + Random.clast(),
      'activityPlace': Random.county(true),
      'activityPhone': Random.natural(13000000000, 18900000000),
      'activityTime': Random.datetime(),
      'activityState': Random.natural(0, 2),
    };
    activityData.push(temp)
  }
}
