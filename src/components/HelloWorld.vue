<template>
  <div class="hello">
    <h1 v-if="maxCards.length">
      今天使用<a>{{ maxCards.join(",") }}</a
      >信用卡免费用款时间最长！免费使用天数为：<a>{{ freeDays }}</a>
    </h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  mounted() {
    this.today = new Date();
    this.thisMonth = this.today.getMonth();
    // 计算每个卡的免费试用时间
    const interestFreeTimes = this.cards.map((card) => {
      // 获取免息时长（毫秒）
      const freeTimes = this.getFreeTimes(card.billDay, card.repayDay);
      // 获取下一个还款日
      const nextBillDate = this.getNextBillDate(card.billDay);
      // 下一个还款日距离当前时间 + 免息时间
      return nextBillDate - this.today + freeTimes;
    });

    // 免费使用时间最多值
    const maxInterestFreeTimes = Math.max(...interestFreeTimes);

    // 过滤出免费使用时间最多的卡
    this.maxCards = this.cards.filter((_, index) => {
      return interestFreeTimes[index] === maxInterestFreeTimes;
    }).map(card => card.name);
    // 输出最佳信用卡们
    console.log("最佳信用卡:");
    this.maxCards.forEach((card) => console.log(card.name));
    this.freeDays = Math.ceil(maxInterestFreeTimes / (1000 * 60 * 60 * 24));
    console.log(
      "免息天数:",
      Math.ceil(maxInterestFreeTimes / (1000 * 60 * 60 * 24))
    );
  },
  data: function () {
    return {
      today: 0,
      thisMonth: 0,
      cards: [
        { name: "中国银行", billDay: 7, repayDay: 27 },
        { name: "中信银行", billDay: 16, repayDay: 5 },
        { name: "民生银行", billDay: 11, repayDay: 1 },
        { name: "广发银行", billDay: 9, repayDay: 28 },
        { name: "交通银行", billDay: 27, repayDay: 21 },
        { name: "招商银行", billDay: 9, repayDay: 27 },
        { name: "平安银行", billDay: 18, repayDay: 6 },
        { name: "建设银行", billDay: 18, repayDay: 6 },
        { name: "中信银行", billDay: 16, repayDay: 5 },
      ],
      maxCards: [],
      freeDays: 0,
    };
  },
  methods: {
    /**
     * 获取免息时长（毫秒）
     */
    getFreeTimes(billDay, repayDay) {
      const billDate = new Date(this.today.getFullYear(), 0, billDay);
      const repayDate = new Date(
        this.today.getFullYear(),
        repayDay > billDay ? 0 : 1,
        repayDay
      );
      return repayDate - billDate;
    },

    /**
     * 获取下一个账单日期
     * @param {*} billDay 账单日
     */
    getNextBillDate(billDay) {
      const date = new Date(this.today.getFullYear(), this.thisMonth, billDay);
      if (billDay <= this.today.getDate()) {
        date.setMonth(date.getMonth() + 1);
      }
      return date;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
