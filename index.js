console.log('softsphere');

let img_btn = document.querySelector('#chooseImg');
let img_input = document.querySelector('#inputImg');
let img_src = document.querySelector('#sourceImg');
let filter_btns = document.querySelectorAll('.filterBtn');
let slider_range = document.querySelector('#sliderRange');
let slider_name = document.querySelector('#filterName');
let slider_value = document.querySelector('#filterValue');
let flipro_btns = document.querySelectorAll('.filterBtnX');
let reset = document.querySelector('#reset');
let save = document.querySelector('#save');

let brightness = 100;
let contrast = 100;
let hue = 0;
let blur = 0;
let opacity = 100;
let rotate = 0;
let flip_x = 1;
let flip_y = 1;

img_btn.addEventListener('click',()=>img_input.click());

img_input.addEventListener('change',()=>{
    let file = img_input.files[0];
    if(!file) return;
    img_src.src = URL.createObjectURL(file);
    img_src.addEventListener('load',()=>{
        document.querySelector('.utility').classList.remove('disabled');
    });
    // console.log(file)
});

filter_btns.forEach((e)=>{
    e.addEventListener('click',()=>{
        document.querySelector('.active').classList.remove('active');
        e.classList.add('active');
        // console.log(e);
        if(e.id==='brightness'){
            slider_name.innerText = 'Brightness';
            slider_value.innerText = brightness + '%';
            slider_range.max = 200;
            slider_range.value = brightness;
            // console.log('brightness');
        }
        else if(e.id==='contrast'){
            slider_name.innerText = 'Contrast';
            slider_value.innerText = contrast + '%';
            slider_range.max = 200;
            slider_range.value = contrast
            // console.log('contrast');
        }
        else if(e.id==='hue'){
            slider_name.innerText = 'Hue';
            slider_value.innerText = hue + '%';
            slider_range.max = 100;
            slider_range.value = hue;
            // console.log('hue');
        }
        else if(e.id==='blur'){
            slider_name.innerText = 'Blur';
            slider_value.innerText = blur + '%';
            slider_range.max = 100;
            slider_range.value = blur;
            // console.log('blur');
        }
        else if(e.id==='opacity'){
            slider_name.innerText = 'Opacity';
            slider_value.innerText = opacity + '%';
            slider_range.max = 100;
            slider_range.value = opacity;
            // console.log('opacity');
        }
    });
});

slider_range.addEventListener('input',()=>{
    slider_value.innerText = `${slider_range.value}%`;
    let sliderState = document.querySelector('.filterBtns .active');
    console.log(sliderState.id);
    if(sliderState.id==='brightness'){
        brightness = slider_range.value;
    }
    else if(sliderState.id==='contrast'){
        contrast = slider_range.value;
    }
    else if(sliderState.id==='hue'){
        hue = slider_range.value;
    }
    else if(sliderState.id==='blur'){
        blur = slider_range.value;
    }
    else if(sliderState.id==='opacity'){
        opacity = slider_range.value;
    }
    img_src.style.filter = `brightness(${brightness}%) contrast(${contrast}%) hue-rotate(${hue*3.6}deg) blur(${blur}px) opacity(${opacity}%)`;
});

flipro_btns.forEach((e)=>{
    e.addEventListener('click',()=>{
        if(e.id==='rotate-left'){
            rotate -= 90;
        }
        else if(e.id==='rotate-right'){
            rotate += 90;
        }
        else if(e.id==='flip-x'){
            flip_x = flip_x===1 ? -1 : 1;
        }
        else if(e.id==='flip-y'){
            flip_y = flip_y===1 ? -1 : 1;
        }
        img_src.style.transform = `rotate(${rotate}deg) scale(${flip_x},${flip_y})`;
    });
});

reset.addEventListener('click',()=>{
    brightness = 100;
    contrast = 100;
    hue = 0;
    blur = 0;
    opacity = 100;
    rotate = 0;
    flip_x = 1;
    flip_y = 1;
    img_src.style.filter = `brightness(${brightness}%) contrast(${contrast}%) hue-rotate(${hue*1.8}deg) blur(${blur}px) opacity(${opacity}%)`;
    img_src.style.transform = `rotate(${rotate}deg) scale(${flip_x},${flip_y})`;
});

save.addEventListener('click',()=>{
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    
    canvas.width = img_src.naturalWidth;
    canvas.height = img_src.naturalHeight;
    
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) hue-rotate(${hue*3.6}deg) blur(${blur}px) opacity(${opacity}%)`;
    // ctx.scale(1,-1);
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.drawImage(img_src,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
    
    let link = document.createElement('a');
    link.download = 'img.jpg';
    link.href = canvas.toDataURL();
    link.click();
})