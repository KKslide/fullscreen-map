<template>
    <div class="loginBG">
        <form action method="POST" class="loginForm" @submit.prevent="submit">
            <p style="font-size:50px;">请输入口令：</p>
            <p> 口令： <input type="password" v-model="password" autofocus placeholder="请输入口令" /> </p>

            <p>
                是否轮播：
                <input
                    type="radio"
                    name="isCarousel"
                    id="yes"
                    value="yes"
                    v-model="isCarousel"
                />
                <label for="yes">是</label>
                <input type="radio" name="isCarousel" id="no" value="no" v-model="isCarousel" />
                <label for="no">否</label>
            </p>

            <p>
                轮播时间：
                <input
                    type="number"
                    v-model="carouselTime"
                    placeholder="默认轮播时间为30秒"
                    :disabled="isCarousel=='no'"
                />
            </p>

            <p class="carouselList">
                <span>轮播页面：</span>
                <em>
                    <input type="checkbox" name="carouselList" id="screenpic1" value="screenpic1" v-model="carouselList"/>
                    <label for="screenpic1">温氏物联网金融</label>
                </em>
                <br />
                <em>
                    <input type="checkbox" name="carouselList" id="screenpic2" value="screenpic2" v-model="carouselList"/>
                    <label for="screenpic2">线上资产业务监控大屏</label>
                </em>
                <br />
                <em>
                    <input type="checkbox" name="carouselList" id="screenpic3" value="screenpic3" v-model="carouselList"/>
                    <label for="screenpic3">线上存款监控大屏</label>
                </em>
                <br />
                <em>
                    <input type="checkbox" name="carouselList" id="screenpic4" value="screenpic4" v-model="carouselList"/>
                    <label for="screenpic4">移动支付业务情况</label>
                </em>
                <br />
                <em>
                    <input type="checkbox" name="carouselList" id="screenpic5" value="screenpic5" v-model="carouselList"/>
                    <label for="screenpic5">惠普金融业务大屏</label>
                </em>
                <br />
                <em>
                    <input type="checkbox" name="carouselList" id="screenpic6" value="screenpic6" v-model="carouselList"/>
                    <label for="screenpic6">喜之郎供应链业务</label>
                </em>
            </p>

            <p>
                <input type="submit" value="确认" />
            </p>
        </form>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            toPage: '',
            password: '',
            carouselTime: 30,
            isCarousel: 'no',
            carouselList:[]
        }
    },
    methods: {
        submit() {
            if (!this.password) {
                alert('没填密码！')
            }
            if (this.isCarousel != 'no' && !this.carouselTime) {
                alert('没填轮播时间！')
            }
            if (this.carouselList.length==0) {
                alert('请选择轮播页面！')
            }
            sessionStorage.setItem('timer', this.carouselTime);
            sessionStorage.setItem('isCarousel', this.isCarousel);
            sessionStorage.setItem('carouselList', JSON.stringify(this.carouselList.sort()));
            if (!sessionStorage.getItem('toPage') ||sessionStorage.getItem('toPage') == '/' || (sessionStorage.getItem('toPage') == '/access')) {
                this.toPage = this.carouselList.sort()[0]
            } else {
                this.toPage = sessionStorage.getItem('toPage')
            }
            axios({
                url: this.$http.access.url, // 本地
                method: this.$http.access.method,
                data: { password: this.password }
            }).then(res => {
                if (res.data.message) {
                    sessionStorage.setItem('isAdmin', true)
                    this.$router.push(this.toPage)
                } else {
                    this.password = ''
                    alert('口令错误！请重新输入！')
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.loginBG {
    width: 100%;
    height: 100vh;
    // background: url(../../../static/images/bg.jpg);
    background-size: 100% 100%;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    form.loginForm {
        background-color: rgba(223, 223, 223, 0.1);
        color: #fff;
        box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.62);
        border-radius: 15px;
        width: 600px;
        // height: 400px;
        padding: 10px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        p {
            font-size: 30px;
            padding: 0 50px;
            text-align: left;
        }
        p:first-child {
            text-align: center;
        }
        p.carouselList {
            font-size: 25px;
            position: relative;
            span {
                position: absolute;
            }
            em{
                margin-left: 130px;
            }
        }
        p {
            input {
                font-size: 20px;
            }
            input[type="password"] {
                height: 30px;
                border: 1px solid #666;
                padding: 0 5px;
            }
            input[type="submit"] {
                height: 30px;
                //   font-size: 20px;
                padding: 0 5px;
            }
        }
    }
}
</style>