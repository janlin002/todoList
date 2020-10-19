// Create Read Delete Update
new Vue({
    el: "#app",
    data: {
      // 輸入文字
      inputText: "",
      // 所有資料
      list: [],
      // 輸入法狀態
      compositionStatus: false,
      // 修改資料對象
      editing:null,
      // 修改內容
      editingText:"",
      // 顯示類型
      show:"all"
    },
    computed:{
      // Read
      filterList(){
        //all,open,done
        if(this.show === "all"){
          return this.list
        }else if(this.show === "open"){
          return this.list.filter((item)=>{
            return item.status === false
          })
        }else if(this.show === "done"){
          return this.list.filter((item)=>{
            return item.status === true
          })
        }else{
          return []
        }
      },
    },
    methods: {
      // Create
      cstartHandler() {
        this.compositionStatus = true;
      },
      cendHandler() {
        this.compositionStatus = false;
      },
      inputHandler() {
        if (this.compositionStatus) return false;
        this.list.push({
          timestamp: new Date().getTime(),
          status: false,
          content: this.inputText
        });
        this.inputText = "";
      },
      // Delete
      deleteHandler(item) {
        this.list = this.list.filter((target) => {
          return target != item;
        });
        // this.list.splice(index,1)
      },
      // Update
      editHandler(item){
        this.editing = item
        this.editingText = item.content
      },
      completeHandler(){
        this.editing.content = this.editingText
        this.cancelHandler()
      },
      cancelHandler(){
        this.editingText = ""
        this.editing = null
      } 
    },
  });