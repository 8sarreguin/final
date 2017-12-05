//Defines how all Devices with work.

function Device(t,ma,c){

    //Instance Variables
    this.type = t;
    this.state = "off";
    this.millAmps = ma;
    this.capacity = c;
    this.juice = 1;
    this.rate = [0.0015,0.0235,0.23];

    //Instance Functions

    this.power = function(){
      return this.juice;
    }
    this.on = function(){
        if(this.state == "off" && this.juice >0){
           this.state = "idle";
        }
        else if (this.state == idle){
           this.state = "active";
        }
    };

    this.off = function(){
      if(this.state == "active" || this.state == "idle"){
        this.state = "off";
    }
  };

    this.wake = function(){
      if(this.state == "idle"){
        this.state = "active";
      }
    };

    this.sleep = function(){
      if(this.state == "active"){
        this.state = "idle";
      }
    };


    this.charge = function(min){
        //adds more electricity to the device's juice depending on its state
        if(this.state == "off"){
            let charge = (this.millAmps / this.capacity);
            let output = 1 - this.rate[0];
            let time = min / 60;
            this.juice = this.juice + charge*output*time;
        }
        else if(this.state == "idle"){
          let charge = (this.millAmps / this.capacity);
          let output = 1 - this.rate[1];
          let time = min / 60;
          this.juice = this.juice + charge*output*time;
        }
        else if(this.state == "active"){
          let charge = (this.millAmps / this.capacity);
          let output = 1 - this.rate[2];
          let time = min / 60;
          this.juice = this.juice + charge*output*time;
        }

        //resets juice to 1 if it has exceeded 1
        if(this.juice > 1){
          this.juice = 100;
        }
    };

    this.use = function(min){
        if (this.state == "active") {
            this.juice = (this.juice * 100) - (this.rate[2] * min);
        }

        else if (this.state == "idle") {
            this.juice = (this.juice * 100) - (this.rate[1] * min);
        }

        else if (this.state == "off") {
            this.juice = (this.juice * 100) - (this.rate[0] * min);
        }
        if(this.juice<0){
            this.juice=0;
        }
    };
}//end of the device declaration

//defines the testing code.
function main(){
  let shitStuffs = new Device("Moar Shit", 1500, 5000);
  shitStuffs.on();
  //shitStuffs.wake();
  console.log(shitStuffs.state);
  shitStuffs.use(600);
  console.log(shitStuffs.juice);
  console.log(shitStuffs.power());
  shitStuffs.off();
  shitStuffs.charge(120);
  console.log(shitStuffs.power());
  console.log(shitStuffs.juice);
}
//runs the testing code.
main();
