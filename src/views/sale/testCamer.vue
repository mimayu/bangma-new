<template>
    <div class="Uploader">
        <Uploader :after-read="handleRead">
            <Icon name="photograph" />
        </Uploader>
    </div>
</div>

</template>

<script>
import { Uploader, Icon } from 'vant';

export default {
    name: 'testCamer',
    components: {
        Uploader,
        Icon
    },
    data () {
        return {
            imgArray: [],
            imgNumber: 0,
            settings: {
                uploadUrl: '/api/do_upload/',
                compress: true,
                compressionRatio: 20,
                data: [],
                max: 9,
                maxSize: 5 * 1024, // 5MB
                typeArray: ['jpeg', 'jpg', 'png', 'gif'],
            },
            value: ''
        }
    },
    methods: {
        handleRead(file) {
            console.log('file', file);
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  
</style>
