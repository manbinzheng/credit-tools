import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


// 信用卡信息
const cards = [
  {name: '中国银行', billDay: 7, repayDay: 27},
  {name: '中信银行', billDay: 16, repayDay: 5}, 
  {name: '民生银行', billDay: 11, repayDay: 1},
  {name: '广发银行', billDay: 9, repayDay: 28},
  {name: '交通银行', billDay: 27, repayDay: 21},
  {name: '招商银行', billDay: 9, repayDay: 27},
  {name: '平安银行', billDay: 18, repayDay: 6},
];

// 当前日期  
const today = new Date();
const thisMonth = today.getMonth();

// 计算每个卡的免费试用时间
const interestFreeTimes = cards.map(card => {
  // 获取免息时长（毫秒）
  const freeTimes = getFreeTimes(card.billDay, card.repayDay);
  // 获取下一个还款日
  const nextBillDate = getNextBillDate(card.billDay);
  // 下一个还款日距离当前时间 + 免息时间
  return nextBillDate - today + freeTimes;
});

// 免费使用时间最多值
const maxInterestFreeTimes = Math.max(...interestFreeTimes);

// 过滤出免费使用时间最多的卡
const maxCards = cards.filter((_,index) => {
  return interestFreeTimes[index] === maxInterestFreeTimes;
});
// 输出最佳信用卡们
console.log('最佳信用卡:');
maxCards.forEach(card => console.log(card.name));

console.log('免息天数:', Math.ceil(maxInterestFreeTimes / (1000 * 60 * 60 * 24)));


/**
 * 获取免息时长（毫秒）
 */
function getFreeTimes(billDay, repayDay) {
  const billDate = new Date(today.getFullYear(), 0, billDay)
  const repayDate = new Date(today.getFullYear(), repayDay > billDay ? 0 : 1, repayDay)
  return repayDate - billDate;
}

function getNextBillDate(billDay) {
  const date = new Date(today.getFullYear(), thisMonth, billDay);
  if(billDay <= today.getDate()) {
    date.setMonth(date.getMonth() + 1);
  }
  return date;
  // const nextMonth = billDay <= today.getDate() ? thisMonth + 1 : thisMonth;
  // return new Date(today.getFullYear(), nextMonth, billDay);
}

new Vue({
  render: h => h(App),
}).$mount('#app')
