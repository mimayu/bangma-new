<template>
    <div class="bossAudit_container">
        审核完成
    </div>
</template>

<script>
    import { getEstate } from '@/server';
    import { Cell, CellGroup, Button, Field, Toast, Popup, Picker } from 'vant';
    import { postAddCustomer } from '@/server';

    export default {
        name: 'bossAudit',
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
    .bossAudit_container {
        
    }
</style>
