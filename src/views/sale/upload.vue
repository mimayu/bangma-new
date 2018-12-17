// 统计img总数 防止重复
let imgNumber = 0;

// 生成唯一的id
const getUuid = () => {
    return "img-" + new Date().getTime() + "-" + imgNumber++;
};

<input ref="input" type="file" class="file-input" name="image" accept="image/*" multiple="multiple" @change="handleInputChange" />

getUuid() {
    return "img-" + new Date().getTime() + "-" + this.imgNumber++;
},
handleInputChange(event) {
    console.log('res', event);
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

    // type
    formData.append('type', blob.type);
    // size
    formData.append('size', blob.size);
    // append 文件
    formData.append('file', blob, imgFile.name);
    formData.append('customer_id', 1);
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
            if (xhr.status === 200 || xhr.status === 201) {
                // 上传成功
                _this.handleUploadEnd(data, 2);
            } else {
                // 上传失败
                _this.handleUploadEnd(data, 3);
            }
        }
    };

    xhr.open('POST', uploadUrl , true);
    xhr.send(formData);
},
getImagesListDOM () {
    // 处理显示图片的DOM
    const { max } = this.settings;
    const _this = this;
    const result = [];
    const uploadingArray = [];
    const imgArray = this.imgArray;

    imgArray.map((item)=>{
        result.push(
            <Figure key={item.id} {...item} onDelete={_this.handleDelete.bind(_this)} />
        );

        // 正在上传的图片
        if(item.status === 1){
            uploadingArray.push(item);
        }
    });

    // 图片数量达到最大值
    if(result.length >= max ) return result;

    let onPress = ()=>{_this.refs.input.click();};

    //  或者有正在上传的图片的时候 不可再上传图片
    if(uploadingArray.length > 0) {
        onPress = undefined;
    }

    // 简单的显示文案逻辑判断
    let text = '上传图片';

    if(uploadingArray.length > 0){
        text = (imgArray.length - uploadingArray.length) + '/' + imgArray.length;
    }

    result.push(
        <Touchable
            key="add"
            activeClassName={'zby-upload-img-active'}
            onPress={onPress}
        >
            <div className="zby-upload-img">
                <span key="icon" className="fa fa-camera" />
                <p className="text">{text}</p>
            </div>
        </Touchable>
    );

    return result;
},
handleDelete(id) {
    this.setState((previousState)=>{
        previousState.imgArray = previousState.imgArray.filter((item)=>(item.id !== id));
        return previousState;
    });
},
handleProgress (id, e) {
    // 监听上传进度 操作DOM 显示进度
    const number = Number.parseInt((e.loaded / e.total) * 100) + "%";
    console.log('number', number);
    // const text = document.querySelector('#text-'+id);
    // const progress = document.querySelector('#progress-'+id);

    // text.innerHTML = number;
    // progress.style.width = number;
},
handleUploadEnd (data, status) {
    // 准备一条标准数据
    const _this = this;
    const obj = {id: data.uuid, imgKey: '', imgUrl: '', name: data.file.name, dataUrl: data.dataUrl, status: status};
    console.log('end', status, obj, this.imgArray);
    this.imgArray.reducer(() => {

    },[])
    // 更改状态
    // this.setState((previousState)=>{
    //     previousState.imgArray = previousState.imgArray.map((item)=>{
    //         if(item.id === data.uuid){
    //             item = obj;
    //         }

    //         return item;
    //     });
    //     return previousState;
    // });
    console.log('end', status, obj, this.imgArray);
    // 上传下一个
    const nextUpload = this.uploadGen.next();
    if(!nextUpload.done){
        nextUpload.value.map((item)=>{
            _this.transformFileToDataUrl(item, _this.compress, _this.processData);
        });
    }
}