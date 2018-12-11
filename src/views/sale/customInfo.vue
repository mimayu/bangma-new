<template>
    <div class="customInfo_container">
        <Cell-group>
            <Field
                v-model="name"
                label="姓名"
            />
            <Cell title="性别" is-link @click="choseGender"/>
            <Cell title="年龄" is-link @click="choseGender"/>
            <Field
                v-model="mobile"
                label="手机"
            />
            <Field
                v-model="phone"
                label="家庭电话"
            />
            <Field
                v-model="phone"
                label="住址"
            />
            <Field
                v-model="phone"
                label="小区名称"
            />
            <Cell title="户型" is-link @click="choseGender"/>
            <Field
                v-model="phone"
                label="面积"
            />
            <Cell title="房屋类型" is-link @click="choseGender"/>
            <Cell title="装修类型" is-link @click="choseGender"/>
            <Cell title="施工区域" is-link @click="choseGender"/>
            <Field
                v-model="message"
                label="施工内容"
                type="textarea"
                placeholder="请输入~"
                rows="2"
                autosize
            />
        </Cell-group>
        <Cell-group>
            <Cell title="查看记录" is-link @click="choseGender"/>
        </Cell-group>
        <Cell-group>
            <Cell title="订单号" value="003652"/>
            <Cell title="接单日期" value="2018-12-11"/>
            <Cell title="业务员" value="董春华"/>
            <Cell title="订单状态" value="基检未约"/>
            <Cell title="预约时间" value="-"/>
        </Cell-group>
        <Cell-group>
            <Cell title="客户来源" value="百度"/>
            <Cell title="刷新PSR" value="许祥春"/>
            <Cell title="推荐人" value="陆卫卫"/>
        </Cell-group>
        <Button type="primary" size="large" @click="visitAdd">保存</Button>
        <Popup v-model="genderShow" position="bottom">
            <Picker show-toolbar :columns="genderActions" @cancel="handleGenderCancel" @confirm="handleGenderConfirm" @change="handleGenderSelect" />
        </Popup>
    </div>
</template>

<script>
    import { Cell, CellGroup, Button, Field, Toast, Popup, Picker } from 'vant';
    import { postShangmenAdd } from '@/server';

    export default {
        name: 'visit',
        components: {
            Cell,
            CellGroup,
            Button,
            Field,
            Toast,
            Popup, 
            Picker
        },
        data() {
            return {
               name: '',
               mobile: '',
               phone: '',
               message: '',
               genderShow: false,
               genderActions: [
                   '男',
                   '女'
               ]
            };
        },
        methods: {
            visitAdd() {

            },
            choseGender() {
                this.genderShow = true;
            },
            handleGenderCancel() {
                this.genderShow = false;
            },
            handleGenderConfirm() {
                this.genderShow = false;
            },
            handleGenderSelect() {

            }
        }
    }
</script>

<style lang="scss">
    .customInfo_container {

    }
</style>
