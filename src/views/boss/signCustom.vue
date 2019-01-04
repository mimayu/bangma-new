<template>
    <div class="signCustom_container">
        签约客户
    </div>
</template>

<script>
    import { getEstate } from '@/server';
    import { Cell, CellGroup, Button, Field, Toast, Popup, Picker } from 'vant';
    import { postAddCustomer } from '@/server';

    export default {
        name: 'signCustom',
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
                
            };
        },
        created() {
            
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    .signCustom_container {
        
    }
</style>
