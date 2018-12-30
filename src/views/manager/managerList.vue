<template>
    <div class="customInfo_container">
        <Radio-group v-model="radio">
            <Cell-group>
                <Cell title="单选框 1" clickable @click="radio = '1'">
                <Radio name="1" />
                </Cell>
                <Cell title="单选框 2" clickable @click="radio = '2'">
                <Radio name="2" />
                </Cell>
            </Cell-group>       
        </Radio-group>
        <Button type="primary" size="large" @click="">保存</Button>
    </div>
</template>

<script>
    import { Cell, CellGroup, Button, Field, Toast, Popup, Picker , RadioGroup, Radio} from 'vant';
    import { postAddCustomer } from '@/server';

    export default {
        name: 'visit',
        components: {
            Cell,
            CellGroup,
            Button,
            Field,
            Toast,
            Popup, 
            Picker, RadioGroup, Radio
        },
        data() {
            return {
                 radio: '1'
            };
        },
        methods: {
           
    }
    }
</script>

<style lang="scss">
    .customInfo_container {

    }
</style>
