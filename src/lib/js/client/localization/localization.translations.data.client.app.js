export function L(key, lang) {
    return languages[lang].get(key)
}

const en = new Map([
    ['homepage-title', 'Homepage | Niki The Cat Coffee'],
    ['hot-coffees-title', 'Hot Coffees | Niki The Cat Coffee'],
    ['cold-coffees-title', 'Cold Coffees | Niki The Cat Coffee'],
    ['gallery-title', 'Gallery | Niki The Cat Coffee'],
    ['about-us-title', 'About Us | Niki The Cat Coffee'],
    ['contact-title', 'Contact | Niki The Cat Coffee'],

    ['pages', 'PAGES'],
    ['homepage', 'Homepage'],
    ['hotCoffees', 'Hot Coffees'],
    ['coldCoffees', 'Cold Coffees'],
    ['gallery', 'Gallery'],
    ['aboutUs', 'About Us'],
    ['contact', 'Contact'],

    ['language', 'LANGUAGE'],
    ['turkish', 'Turkish'],
    ['english', 'English'],
    ['onLangChange', 'The language is set to English.'],

    ['theme', 'THEME'],
    ['onDark', 'Theme is set to the dark.'],
    ['onBright', 'Theme is set to the bright.'],

    ['lostConnection', 'No internet connection. Some functionality may be broken.'],
    ['onlineBack', 'You are online back.'],

    ['jsDisabled', 'Javascript is Disabled'],
    ['jsDisabledDescription', 'In order to be able to use the application, enable Javascript.'],

    ['optional', 'OPTIONAL'],

    ['cancel', 'CANCEL'],
    ['send', 'SEND FORM'],

    ['page', 'Page'],

    ['contactBeautify', 'WE WANT TO BEAUTIFY YOUR EXPERIENCE'],
    ['contactTitle', 'Your Thoughts, Matter.'],
    ['contactText', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Lure nobis distinctio cumque consequatur porro explicabo, quod eveniet molestiae blanditiis illo labore voluptate consectetur temporibus corporis dicta debitis assumenda culpa eius.'],
    ['contactUs', 'CONTACT US'],

    ['contactFormTitle', 'We Wonder Your Suggestions.'],
    ['name', 'NAME'],
    ['surname', 'SURNAME'],
    ['mail', 'E-MAIL ADDRESS'],
    ['phone', 'PHONE NUMBER'],
    ['thoughts', 'YOUR THOUGHTS'],

    ['tTextNameAndSurname', 'It must be at least 3, at most 25 characters'],
    ['tTextEmail', 'It must be in format of xxx@xxx.com'],
    ['tTextPhone', 'It must be in format of 5xx xxx xxx xx'],
    ['tTextThoughts', 'It must be at least 10, at most 300 characters']
])

const tr = new Map([
    ['homepage-title', 'Anasayfa | Niki The Cat Coffee'],
    ['hot-coffees-title', 'Sıcak Kahveler | Niki The Cat Coffee'],
    ['cold-coffees-title', 'Soğuk Kahveler | Niki The Cat Coffee'],
    ['gallery-title', 'Galeri | Niki The Cat Coffee'],
    ['about-us-title', 'Hakkımızda | Niki The Cat Coffee'],
    ['contact-title', 'İletişim | Niki The Cat Coffee'],

    ['pages', 'SAYFALAR'],
    ['homepage', 'Anasayfa'],
    ['hotCoffees', 'Sıcak Kahveler'],
    ['coldCoffees', 'Soğuk Kahveler'],
    ['gallery', 'Galeri'],
    ['aboutUs', 'Hakkımızda'],
    ['contact', 'İletişim'],

    ['language', 'DİL'],
    ['turkish', 'Türkçe'],
    ['english', 'İngilizce'],
    ['onLangChange', 'Dil, Türkçe olarak ayarlandı.'],

    ['theme', 'TEMA'],
    ['onDark', 'Tema, koyu olarak ayarlandı.'],
    ['onBright', 'Tema, açık olarak ayarlandı.'],

    ['lostConnection', 'İnternet bağlantısı koptu. Bazı fonksiyonlar devre dışı kalabilir.'],
    ['onlineBack', 'Tekrar internet bağlantısı kuruldu.'],

    ['jsDisabled', 'Javascript Devre Dışı'],
    ['jsDisabledDescription', "Uygulamayı kullanabilmek için, Javascript'i etkinleştirin."],

    ['optional', 'TERCİHEN'],

    ['cancel', 'VAZGEÇ'],
    ['send', 'GÖNDER'],

    ['page', 'Sayfa'],

    ['contactBeautify', 'DENEYİMİNİZİ GÜZELLEŞTİRMEK İSTİYORUZ'],
    ['contactTitle', 'Düşünceleriniz, Değerli.'],
    ['contactText', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Lure nobis distinctio cumque consequatur porro explicabo, quod eveniet molestiae blanditiis illo labore voluptate consectetur temporibus corporis dicta debitis assumenda culpa eius.'],
    ['contactUs', 'BİZE YAZIN'],

    ['contactFormTitle', 'Önerilerinizi Merak Ediyoruz.'],
    ['name', 'ADINIZ'],
    ['surname', 'SOYADINIZ'],
    ['mail', 'E-POSTA ADRESİNİZ'],
    ['phone', 'TELEFONUNUZ'],
    ['thoughts', 'DÜŞÜNCELERİNİZ'],

    ['tTextNameAndSurname', 'En az 3, en fazla 25 karakter olmalı'],
    ['tTextEmail', 'xxx@xxx.com formatında olmalı'],
    ['tTextPhone', '5xx xxx xxx xx formatında olmalı'],
    ['tTextThoughts', 'En az 10, en fazla 300 karakter olmalı']
])

const languages = { en, tr }