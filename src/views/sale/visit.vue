<template>
    <div class="visit_container">
        <Cell-group>
            <Cell title="订单状态" is-link :value="status" @click="choseOrder" />
            <Cell title="上门时间" is-link :value="time" @click="choseTime" />
            <Cell title="重点跟进" is-link :value="level" @click="choseLevel" v-if="status !== '签约成功'"/>

            <Cell title="环保意识" is-link :value="huanbao" @click="choseHuanbao" v-if="status !== '签约成功'"/>
            <Cell title="价格接受度" is-link :value="jiage" @click="choseJiage" v-if="status !== '签约成功'"/>

            <Cell title="客户反馈" is-link :value="action" @click="choseCustom"  v-if="status !== '签约成功'"/>
            <Cell title="跟进时间" is-link :value="nextTime" @click="choseNextTime" v-if="status === '签约等待'" />
            <Cell title="签约日期" is-link :value="dateOrder" @click="showOrderTime" v-if="status === '签约成功'" />
            <Cell title="预计开工日期" is-link :value="dateYujiKaigong" @click="showWorkTime" v-if="status === '签约成功'" />
            <Field label="签约金额" v-model="orderFee" placeholder="请输入签约金额" v-if="status === '签约成功'" />
            <Field label="签约定金" v-model="orderDingjin" placeholder="请输入签约定金" v-if="status === '签约成功'" />
        </Cell-group>
        <Cell-group>
            <Field
                v-model="message"
                label="上门情况"
                type="textarea"
                placeholder="请输入内容"
                rows="2"
                autosize
            />
        </Cell-group>
        <Cell-group>
            <Field
                label="户型图、现场勘查图"
            />
        </Cell-group>
        <div class="am-image-picker-list">
            <div class="am-flexbox-item-contain" v-for="item in imgArray" :key="item.id">
                <div class="am-flexbox-item">
                    <div class="am-image-picker-item">
                        <div class="am-image-picker-item-remove" role="button" aria-label="Click and Remove this image" @click="handleDelete(item.id)"></div>
                        <div class="am-image-picker-item-content" role="button" aria-label="Image can be clicked" :style="changePic(item)"></div>
                    </div>
                </div>
            </div>

            <div class="am-flexbox-item-contain">
                <div class="am-flexbox-item">
                    <div class="am-image-picker-item am-image-picker-upload-btn" role="button" aria-label="Choose and add image">
                        <input ref="input" type="file" class="file-input" name="image" accept="image/*" multiple="multiple" @change="handleInputChange" />
                    </div>
                </div>
            </div>
        </div>
        


        <Button type="primary" size="large" @click="handleSubmit">提交</Button>

        <Popup v-model="show" position="bottom">
            <datetime-picker
                @confirm="handleComfirm"
                @cancel="handleCancel"
                v-model="currentDate"
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
            />
        </Popup>
        <Popup v-model="nextShow" position="bottom">
            <datetime-picker
                @confirm="handleNextComfirm"
                @cancel="handleNextCancel"
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
                v-model="currentDate"
            />
        </Popup>
        <Popup v-model="showOrder" position="bottom">
            <datetime-picker
                @confirm="handleOrderDateComfirm"
                @cancel="handleOrderDateCancel"
                type="date"
                :min-date="minDate"
                :max-date="maxDate"
                v-model="currentDate"
            />
        </Popup>
        <Popup v-model="showWork" position="bottom">
            <datetime-picker
                @confirm="handleWorkComfirm"
                @cancel="handleWorkCancel"
                type="date"
                :min-date="minDate"
                :max-date="maxDate"
                v-model="currentDate"
            />
        </Popup>

        <Popup v-model="orderShow" position="bottom">
            <Picker show-toolbar :columns="orderActions" @cancel="handleOrderCancel" @confirm="handleOrderConfirm" />
        </Popup>
        <Popup v-model="levelShow" position="bottom">
            <Picker show-toolbar :columns="levelActions" @cancel="handleLevelCancel" @confirm="handleLevelConfirm"/>
        </Popup>
        <Popup v-model="huanbaoShow" position="bottom">
            <Picker show-toolbar :columns="huanbaoActions" @cancel="handleHuanbaoCancel" @confirm="handleHuanbaoConfirm"/>
        </Popup>
        <Popup v-model="jiageShow" position="bottom">
            <Picker show-toolbar :columns="jiageActions" @cancel="handleJiageCancel" @confirm="handleJiageConfirm"/>
        </Popup>
        <Popup v-model="customShow" position="bottom">
            <Picker show-toolbar :columns="customActions" @cancel="handleCustomCancel" @confirm="handleCustomConfirm"/>
        </Popup>
    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, DatetimePicker, Button, Field, Toast, Picker } from 'vant';
    import { postShangmenAdd } from '@/server';
    import { timetrans } from '@/utils/time';

    // 统计img总数 防止重复
    let imgNumber = 0;
    // 生成唯一的id
    const getUuid = () => {
        return "img-" + new Date().getTime() + "-" + imgNumber++;
    };

    export default {
        name: 'visit',
        components: {
            Cell,
            CellGroup,
            Popup,
            DatetimePicker,
            Button,
            Field,
            Toast,
            Picker
        },
        data() {
            return {
                minHour: 10,
                maxHour: 20,
                minDate: new Date(),
                maxDate: new Date(),
                currentDate: new Date(),
                show: false,
                nextShow: false, //跟进日期 签约等待
                orderShow: false,
                levelShow: false,

                huanbaoShow: false,
                jiageShow:false,

                customShow: false,
                showOrder: false, // 处理成功 -> 签约日期
                showWork: false,  //处理成功 -> 预计开工日期
                message: '',
                orderActions: [
                    '签约等待', '签约成功', '签约失败'
                ],
                levelActions: [
                    'A', 'B', 'C', 'D'
                ],

                huanbaoActions: [
                    '非常重视', '重视', '一般', '无所谓'
                ],
                huanbaoCode: [
                    '1', '2', '3', '4'
                ],
                jiageActions: [
                    '能接受立邦价格', '觉得立邦价格略高', '立邦价格不能接受'
                ],
                jiageCode: [
                    '1', '2', '3'
                ],

                customActions: [
                    '',
                    '客户需要商量考虑。', 
                    '已加微信，继续跟进。', 
                    '预留电话，已约定下次联系时间。', 
                    '时间安排不过来，不做了。', 
                    '价格太贵，不做了。'
                ],
                status: '签约等待', // 状态
                time: '', // 时间
                level: '', // 客户重要程度

                huanbao:'',// 客户对环保的意识
                iHuanbao:'',
                jiage:'',// 客户对立邦价格接受程度
                iJiage:'',

                action: '', // 操作
                nextTime: '', //跟进日期 签约等待
                dateOrder: '', // 签约成功 签约日期 2018-12-08
                dateYujiKaigong: '', // 签约成功 预计开工日期 2018-12-08
                orderFee: '', // 签约成功 金额
                orderDingjin: '', // 签约成功 签约定金
                imgArray: [], // 上传图片设置
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
            };
        },
        created() {
            this.minDate.setMonth(this.minDate.getMonth()-1);
            this.maxDate.setMonth(this.minDate.getMonth()+6);
        },
        methods: {
            /*
            * 处理提交
            */
            handleSubmit() {
                let iCustomerId = this.$route.params.id || 1;
                let params = {
                    'iCustomerId': iCustomerId,
                    'dateShangmen': this.time,
                    'shangmenContent': `${this.action}${this.message}`,
                    'iLevel': this.level,
                    'iHuanbao': this.iHuanbao,
                    'iJiage':this.iJiage
                }
                if(this.status == '签约等待') {
                   params.iStatus = 4;
                   params.timeNextFollow = this.nextTime;
                   params.active = 0;
                }
                if(this.status == '签约成功') {
                   params.iStatus = 5;
                   params.dateOrder = this.dateOrder;
                   params.dateYujiKaigong = this.dateYujiKaigong;
                   params.orderFee = this.orderFee;
                   params.orderDingjin = this.orderDingjin;
                   params.active = 1;
                }
                if(this.status == '签约失败') {
                   params.iStatus = 101;
                   params.active = 2;
                }
                postShangmenAdd(params).then(
                    res => {
                        if(res.success == 1) {
                            Toast(res.msg);
                            this.$router.push(
                                {
                                    name: 'signStatus',
                                    query: {
                                        active: params.active
                                    }
                                }
                            )
                            return;
                        }
                        Toast(res.msg);
                    }
                )
            },
            /*
            * 选择订单状态
            */
            choseOrder() {
                this.orderShow = true;
            },
            handleOrderConfirm(value) {
                this.status = value;
                this.orderShow = false;
            },
            handleOrderCancel() {
                this.orderShow = false;
            },
            /*
            * 选择上门时间
            */
            choseTime() {
                this.show = true;
            },
            handleComfirm(value) {
                let data = timetrans(value);
                this.time = data;
                this.show = false;
            },
            handleCancel(e) {
                this.show = false;
            },
            /*
            * 选择客户等级
            */
            choseLevel() {
                this.levelShow = true;
            },
            handleLevelConfirm(value) {
                this.level = value;
                this.levelShow = false;
            },
            handleLevelCancel() {
                this.levelShow = false;
            },

            /*
            * 选择客户环保意识
            */
            choseHuanbao() {
                this.huanbaoShow = true;
            },
            handleHuanbaoConfirm(value) {
                let index = this.huanbaoActions.findIndex((item) => {
                    return item == value
                });
                let iHuanbao = this.huanbaoCode[index];
                this.huanbao = value;
                this.iHuanbao = iHuanbao;
                
                this.huanbaoShow = false;
            },
            handleHuanbaoCancel() {
                this.huanbaoShow = false;
            },
            /*
            * 选择客户价格接受
            */
            choseJiage() {
                this.jiageShow = true;
            },
            handleJiageConfirm(value) {
                let index = this.jiageActions.findIndex((item) => {
                    return item == value
                });
                let iJiage = this.jiageCode[index];
                this.jiage = value;
                this.iJiage = iJiage;

                this.jiageShow = false;
            },
            handleJiageCancel() {
                this.jiageShow = false;
            },

            /*
            * 选择客户反馈
            */
            choseCustom() {
                this.customShow = true;
            },
            handleCustomConfirm(value) {
                this.action = value;
                this.customShow = false;
            },
            handleCustomCancel() {
                this.customShow = false;
            },
            /*
            * 处理等待 -> 下次跟进日期
            */
            choseNextTime() {
                this.nextShow = true;
            },
            handleNextCancel(e) {
                this.nextShow = false;
            },
            handleNextComfirm(value) {
                let data = timetrans(value);
                this.nextTime = data;
                this.nextShow = false;
            },
            /*
            * 处理成功 -> 签约日期
            */
            showOrderTime() {
                this.showOrder = true;
            },
            handleOrderDateCancel(e) {
                this.showOrder = false;
            },
            handleOrderDateComfirm(value) {
                let data = timetrans(value, 1);
                this.dateOrder = data;
                this.showOrder = false;
            },
            /*
            * 处理成功 -> 预计开工日期
            */
            showWorkTime() {
                this.showWork = true;
            },
            handleWorkCancel(e) {
                this.showWork = false;
            },
            handleWorkComfirm(value) {
                let data = timetrans(value, 1);
                this.dateYujiKaigong = data;
                this.showWork = false;
            },
            /*
            * 图片处理
            */
            getUuid() {
                return "img-" + new Date().getTime() + "-" + this.imgNumber++;
            },
            handleInputChange(event) {
                const { typeArray, max, maxSize } = this.settings;
                const imgArray = this.imgArray;
                const uploadedImgArray = []; // 真正在页面显示的图片数组
                const uploadQueue = []; // 图片上传队列 这个队列是在图片选中到上传之间使用的 上传完成则清除
                // event.target.files是个类数组对象 需要转成数组方便处理
                const selectedFiles = Array.prototype.slice.call(event.target.files).map((item)=>(item));

                // 检查文件个数 页面显示的图片个数不能超过限制
                if(imgArray.length + selectedFiles.length > max){
                    Toast('文件数量超出最大值');
                    return;
                }

                let imgPass = {
                    typeError: false, 
                    sizeError: false
                };

                // 循环遍历检查图片 类型、尺寸检查
                selectedFiles.map((item)=>{
                    // 图片类型检查
                    if(typeArray.indexOf(item.type.split('/')[1]) === -1){
                        imgPass.typeError = true;
                    }
                    // 图片尺寸检查
                    if(item.size > maxSize * 1024){
                        imgPass.sizeError = true;
                    }

                    // 为图片加上位移id
                    const uuid = this.getUuid();
                    // 上传队列加入该数据
                    uploadQueue.push({uuid: uuid, file: item});
                    // 页面显示加入数据
                    uploadedImgArray.push({ // 显示在页面的数据的标准格式
                        id: uuid, // 图片唯一id
                        dataUrl: '', // 图片的base64编码
                        imgKey: '', // 图片的key 后端上传保存使用
                        imgUrl: '', // 图片真实路径 后端返回的
                        name: item.name, // 图片的名字
                        status: 1 // status表示这张图片的状态 1：上传中，2上传成功，3：上传失败
                    });
                });

                // 有错误跳出
                if(imgPass.typeError){
                    Toast('不支持文件类型');
                    return;
                }

                if(imgPass.sizeError){
                    Toast('文件大小超过限制');
                    return;
                }

                // 没错误准备上传
                // 页面先显示一共上传图片个数
                this.imgArray = imgArray.concat(uploadedImgArray);
                // 通过该函数获取每次要上传的数组
                this.uploadGen = this.uploadGenerator(uploadQueue);
                // 第一次要上传的数量
                const firstUpload = this.uploadGen.next();

                // 真正开始上传流程
                firstUpload.value.map((item)=>{
                    /**
                    * 图片上传分成5步
                    * 图片转dataUrl
                    * 压缩
                    * 处理数据格式
                    * 准备数据上传
                    * 上传
                    *
                    * 前两步是回调的形式 后面是同步的形式
                    */
                    this.transformFileToDataUrl(item, this.compress, this.processData);
                });
            },
            *uploadGenerator (uploadQueue) {
                /**
                * 多张图片并发上传控制规则
                * 上传1-max数量的图片
                * 设置一个最大上传数量
                * 保证最大只有这个数量的上传请求
                *
                */

                // 最多只有三个请求在上传
                const maxUploadSize = 3;

                if(uploadQueue.length > maxUploadSize){

                    const result = [];

                    for(let i = 0; i < uploadQueue.length; i++){
                        // 第一次return maxUploadSize数量的图片
                        if(i < maxUploadSize){
                            result.push(uploadQueue[i]);

                            if(i === maxUploadSize - 1){
                                yield result;
                            }
                        } else {
                            yield [uploadQueue[i]];
                        }
                    }

                } else {
                    yield uploadQueue.map((item)=>(item));
                }
            },
            transformFileToDataUrl (data, callback, compressCallback) {
                /**
                * 图片上传流程的第一步
                * @param data file文件 该数据会一直向下传递
                * @param callback 下一步回调
                * @param compressCallback 回调的回调
                */
                const { compress } = this.settings;
                const imgCompassMaxSize = 200 * 1024; // 超过 200k 就压缩

                // 封装好的函数
                const reader = new FileReader();

                // ⚠️ 这是个回调过程 不是同步的
                reader.onload = function(e) {
                    const result = e.target.result;
                    data.dataUrl = result;

                    if(compress && result.length > imgCompassMaxSize){
                        data.compress = true;

                        callback(data, compressCallback); // 图片压缩
                    } else {
                        data.compress = false;

                        callback(data, compressCallback); // 图片不压缩
                    }
                };
                reader.readAsDataURL(data.file);
            },
            compress (data, callback) {
                /**
                * 压缩图片
                * @param data file文件 数据会一直向下传递
                * @param callback 下一步回调
                */
                const { compressionRatio } = this.settings;
                const imgFile = data.file;
                const img = new window.Image();

                img.src = data.dataUrl;
                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    canvas.width = img.width;
                    canvas.height = img.height;

                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    let compressedDataUrl;

                    if(data.compress){
                        compressedDataUrl = canvas.toDataURL(imgFile.type, (compressionRatio / 100));
                    } else {
                        compressedDataUrl = canvas.toDataURL(imgFile.type, 1);
                    }

                    data.compressedDataUrl = compressedDataUrl;

                    callback(data);
                }
            },
            processData (data) {
                // 为了兼容性 处理数据
                const dataURL = data.compressedDataUrl;
                const imgFile = data.file;
                const binaryString = window.atob(dataURL.split(',')[1]);
                const arrayBuffer = new ArrayBuffer(binaryString.length);
                const intArray = new Uint8Array(arrayBuffer);

                for (let i = 0, j = binaryString.length; i < j; i++) {
                    intArray[i] = binaryString.charCodeAt(i);
                }

                const fileData = [intArray];

                let blob;

                try {
                    blob = new Blob(fileData, { type: imgFile.type });
                } catch (error) {
                    window.BlobBuilder = window.BlobBuilder ||
                        window.WebKitBlobBuilder ||
                        window.MozBlobBuilder ||
                        window.MSBlobBuilder;
                    if (error.name === 'TypeError' && window.BlobBuilder){
                        const builder = new BlobBuilder();
                        builder.append(arrayBuffer);
                        blob = builder.getBlob(imgFile.type);
                    } else {
                        throw new Error('版本过低，不支持上传图片');
                    }
                }

                data.blob = blob;
                this.processFormData(data);
            },
            processFormData (data) {
                // 准备上传数据
                const formData = new FormData();
                const imgFile = data.file;
                const blob = data.blob;

                formData.append('type', blob.type);
                formData.append('size', blob.size);
                formData.append('file', blob, imgFile.name);
                formData.append('customer_id', this.$route.params.id || 0);
                this.uploadImg(data, formData);
            },
            uploadImg (data, formData) {
                // 开始发送请求上传
                const _this = this;
                const xhr = new XMLHttpRequest();
                const { uploadUrl } = this.settings;

                // 进度监听
                xhr.upload.addEventListener('progress', _this.handleProgress.bind(_this, data.uuid), false);

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        const result = JSON.parse(xhr.responseText);
                        console.log('result', result);
                        if (xhr.status === 200 || xhr.status === 201) {
                            // 上传成功
                            _this.handleUploadEnd(data, result, 2);
                        } else {
                            // 上传失败
                            _this.handleUploadEnd(data, result, 3);
                        }
                    }
                };

                xhr.open('POST', uploadUrl , true);
                xhr.send(formData);
            },
            handleDelete(id) {
                let index = this.imgArray.findIndex(item => item.id == id);
                this.imgArray.splice(index, 1);
            },
            handleProgress (id, e) {
                // 监听上传进度 操作DOM 显示进度
                const number = Number.parseInt((e.loaded / e.total) * 100) + "%";
            },
            handleUploadEnd (data, response, status) {
                // 准备一条标准数据
                const _this = this;
                const obj = {
                    id: data.uuid, 
                    imgKey: '', 
                    imgUrl: response.imgUrl ? response.imgUrl : '', 
                    name: data.file.name, 
                    dataUrl: data.dataUrl, 
                    status: status
                };
                let results = this.imgArray.reduce((init, current) => {
                    if(current.id === data.uuid){
                        init.push(obj)
                    }else {
                        init.push(current)
                    }
                    return init
                }, [])
                this.imgArray = results;

                // 上传下一个
                const nextUpload = this.uploadGen.next();
                if(!nextUpload.done){
                    nextUpload.value.map((item)=>{
                        _this.transformFileToDataUrl(item, _this.compress, _this.processData);
                    });
                }
            },
            changePic(item) {
                let style = `background-image: url(${item.dataUrl}); transform: rotate(0deg);`;
                return style;
            }
        }
    }
</script>

<style lang="scss">
    .visit_container {
        .van-cell__title, .van-field .van-cell__title {
            max-width: 100px;
        }
        .van-cell__title, .van-cell__value{
            text-align: left;
        }
        .am-image-picker-list {
            padding: 15px;
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            .am-flexbox-item-contain {
                width: 25%;
                box-sizing: border-box;
                padding: 2px;
                &::after {
                    display: block;
                    content: " ";
                    padding-bottom: 100%;
                }
            }
            .am-flexbox-item {
                position: relative; 
                width: 100%;
                height: 100%;               
            }
            .am-image-picker-item {
                position: absolute;
                top: 50%;
                -webkit-transform: translateY(-50%);
                -ms-transform: translateY(-50%);
                transform: translateY(-50%);
                width: 100%;
                height: 100%;
                input {
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    opacity: 0;
                }
            }
            .am-image-picker-upload-btn {
                box-sizing: border-box;
                border-radius: 3px;
                border: 1px solid #ddd;
                background-color: #fff;
                &::before {
                    width: 1px;
                    height: 25px;
                    content: " ";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    background-color: #ccc;
                }
                &::after {
                    width: 25px;
                    height: 1px;
                    content: " ";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    background-color: #ccc;
                }
            }
            .am-image-picker-item-content {
                height: 100%;
                width: 100%;
                border-radius: 3px;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
            }
            .am-image-picker-item-remove {
                width: 25px;
                height: 25px;
                transform: scale(0.8);
                position: absolute;
                right: 2px;
                top: 2px;
                text-align: right;
                vertical-align: top;
                z-index: 2;
                background: #d8544c;
                border-radius: 50%;
                &::before {
                    content: '';
                    position: absolute;
                    height: 2px;
                    width: 15px;
                    top: 49%;
                    left: 5px;
                    transform: rotate(-45deg);
                    background: #fff;
                }
                &::after {
                    content: '';
                    position: absolute;
                    height: 2px;
                    width: 15px;
                    top: 49%;
                    left: 5px;
                    background: #fff;
                    transform: rotate(45deg);
                }
            }
        }
    }
</style>
