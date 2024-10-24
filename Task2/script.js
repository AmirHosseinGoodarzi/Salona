const bankImageSources = Object.freeze({
    "بانک توسعه تعاون": "./banksImages/tosetaavon.png",
    "بانک انصار": "./banksImages/ansar.png",
    "بانک آینده": "./banksImages/ayande.png",
    "بانک صنعت و معدن": "./banksImages/sanatmadan.png",
    "بانک کشاورزی": "./banksImages/keshavarzi.png",
    "بانک ملی ایران": "./banksImages/melli.png",
    "بانک پاسارگاد": "./banksImages/pasargad.png",
    "بانک صادرات": "./banksImages/saderat.png",
    "بانک دی": "./banksImages/dey.png",
    "بانک توسعه صادرات ایران": "./banksImages/tosesaderat.png",
    "بانک اقتصاد نوین": "./banksImages/eghtesadnovin.png",
    "بانک قوامین": "./banksImages/ghavamin.png",
    "بانک حکمت": "./banksImages/hekmat.png",
    "بانک مشترک ایران و ونزوئلا": "./banksImages/irvn.png",
    "بانک ایران زمین": "./banksImages/iranzamin.png",
    "بانک کار آفرین": "./banksImages/karafarin.png",
    "بانک مسکن": "./banksImages/maskan.png",
    "بانک خاورمیانه": "./banksImages/khavarmiane.png",
    "بانک مهر ایران": "./banksImages/mehr.png",
    "موسسه اعتباری ملل": "./banksImages/melal.png",
    "بانک ملت": "./banksImages/mellat.png",
    "بانک پارسیان": "./banksImages/parsian.png",
    "پست بانک ایران": "./banksImages/post.png",
    "بانک رفاه کارگران": "./banksImages/refah.png",
    "بانک رسالت": "./banksImages/resalat.png",
    "بانک سرمایه": "./banksImages/sarmayeh.png",
    "بانک سامان": "./banksImages/saman.png",
    "بانک سپه": "./banksImages/sepah.png",
    "بانک شهر": "./banksImages/shahr.png",
    "بانک سینا": "./banksImages/sina.png",
    "بانک تجارت": "./banksImages/tejarat.png",
    "بانک گردشگری": "./banksImages/gardeshgari.png",
});

const moveToNextInput = (current) => {
    if (current.value.length === 4) {
        const nextField = current.nextElementSibling;
        nextField.focus();
    }
}
var cardInformation = {};
const showCardInfo = () => {
    const {
        fullCardNumber,
        bankName,
        imageSource
    } = cardInformation
    const cardInfo = document.querySelector("#card_information");
    const info = `<img src="${imageSource}" alt="${bankName}" />
    <div>
      <h2>${bankName}</h2>
      <b>${fullCardNumber}</b>
    </div>
    <div id="card_information_buttons">
      <button
        type="button"
        id="share_btn"
        class="outline"
        onclick="shareOrCopyInfo()"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 512 512"
          height="1rem"
          width="1rem"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M384 336a63.78 63.78 0 0 0-46.12 19.7l-148-83.27a63.85 63.85 0 0 0 0-32.86l148-83.27a63.8 63.8 0 1 0-15.73-27.87l-148 83.27a64 64 0 1 0 0 88.6l148 83.27A64 64 0 1 0 384 336z"
          ></path>
        </svg>
      </button>
      <button
        type="button"
        class="outline"
        id="return_btn"
        onclick="window.location.reload()"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M70.5 265.4l59.6-59.4c2.6-2.6 6.1-4.1 9.9-4.1 3.7 0 7.3 1.4 9.9 4.1 2.6 2.6 4.1 6.1 4.1 9.9s-1.5 7.3-4.1 9.9l-.1.1-41.1 40.1H370c13.2 0 25.8-5.2 35.3-14.7 9.5-9.4 14.7-21.9 14.7-35.3v-48c0-7.7 6.3-14 14-14s14 6.3 14 14v48c0 20.8-8.1 40.3-22.9 55.1-14.8 14.8-34.3 22.9-55.1 22.9H108.3l39.6 40.2c2.6 2.6 4.1 6.1 4.1 9.9 0 3.7-1.4 7.3-4.1 9.9l-.1.1c-2.7 2.5-6.2 3.9-9.8 3.9-3.9 0-7.3-1.4-9.9-4.1l-57.6-57.4c-4.2-4.2-6.5-9.8-6.5-15.7 0-5.8 2.3-11.3 6.5-15.4z"
          ></path>
        </svg>
      </button>
    </div>`;
    cardInfo.innerHTML = info;
    cardInfo.style.display = "flex";
}
const searchCardNumber = (e) => {
    e.preventDefault();
    const cardInputParts = document.querySelectorAll('.card_input_part');
    const fullCardNumber = Array.from(cardInputParts).map((input) => input.value).join("");
    const isVerify = PersianTools.verifyCardNumber(fullCardNumber);
    if (isVerify) {
        const bankName = PersianTools.getBankNameFromCardNumber(fullCardNumber);
        const imageSource = bankImageSources[bankName];
        const cardForm = document.querySelector("form");
        cardForm.style.display = "none";
        cardInformation = {
            fullCardNumber,
            bankName,
            imageSource
        }
        showCardInfo()
    } else {
        cardInputParts.forEach((input) => input.classList.add("invalid"));
        const form_reset_btn = document.querySelector("#form_reset_btn");
        form_reset_btn.style.display = "unset";
        document.querySelector("#errorMessage").innerText = "شماره کارت وارد شده نا معتبر میباشد."
    }
}
const clearForm = () => {
    const cardInputParts = document.querySelectorAll('.card_input_part');
    cardInputParts.forEach((input) => {
        input.value = "";
        input.classList.remove("invalid")
    });
    document.querySelector("#errorMessage").innerText = ""
    const form_reset_btn = document.querySelector("#form_reset_btn");
    form_reset_btn.style.display = "none";
}
const shareOrCopyInfo = () => {
    const {
        fullCardNumber,
        bankName,
    } = cardInformation;
    const data = `شماره کارت ${bankName}
${fullCardNumber}`;
    if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
        navigator.share({
            title: 'اشتراک گذاری شماره کارت',
            text: data
        }).catch((error) => {
            alert('خطا در اشتراک گذاری اطلاعات. لطفا مجددا تلاش نمایید');
            console.error('Error sharing:', error);
        });
    } else {
        navigator.clipboard.writeText(data).then(() => {
            alert('شماره کارت با موفقیت کپی شد.');
        }).catch((error) => {
            alert('خطا در کپی کردن اطلاعات. لطفا مجددا تلاش نمایید');
            console.error('Error copying text:', error);
        });
    }
}