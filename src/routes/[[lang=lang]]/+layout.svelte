<script>
	import Header from "$lib/components/layout/Header.svelte";
</script>

<!-- 

front-end hallet
back-end hallet
    veritabanını kur
    redis kur
    bağla

ödeme sistemini entegre et
fatura oluşturmayı entegre et
kargo takibi entegre et

//

protected route'lar
    prerender iptal edilmeli mi?

//

tespit edilecekleri tespit et
    kargo api
        her yeni olayda bildirim vermeli
        yeni sipariş için kod oluşturma
        iade için kod oluşturma
        kargo takibi
    ödeme sistemi
        iade etme işlemi
        kart kaydetme
        kart silme
        kayıtlı karttan ödeme
    e-fatura
        fatura kesme
        fatura görüntüleme

//

tasarım
    büyük ekran
        header
            logo

            anasayfa
            meşe odunu
            tarifler
            önemli bilgiler
            hakkımızda
            iletişim
            
            bildirimler -> hoverable 
            sepet -> hoverable
            profil -> hoverable

            theme switcher

    küçük ekran
        sol
            logo
        sağ
            theme switcher
            
        bottom bar
            menü
                anasayfa
                meşe odunu
                tarifler
                önemli bilgiler
                hakkımızda
                iletişim
            sepet
            profil
            bildirimler

özellikleri
    app
        üye olmadan tüm özellikleri kullanabilmeli
            sw yapısını gözden geçir
                loading animasyonlara gerek kalmadan yapılabilir mi?
            server'da değişebilecek bir şey olursa, o server'dan ssr ile gelmeli
                sipariş veren kullanıcıyı, veritabanına kaydet ama belli bir süre sonra aktivite olmazsa silinsin
                yalnızca adreslerim indexeddb'de olabilir?
        
        sipariş verme:
            eğer stok sayısından daha çok sayıda sipariş verirse, hata göster

        //

        önemli bilgiler -> hoverable
            sözleşmeler, metinler vb. -> route'lar

        profil
            üye olma
                daha önce indexeddb'de olan veriler, veritabanına aktarılsın
            giriş yapma
                indexeddb'den veri çekmemeli authenticated ise
            çıkış yapma
            şifre değiştirme
            şifremi unuttum
                e-mail adresi ve telefon numarası girsin

            hesabım -> route
                ad
                soyad
                e-mail
                telefon numarası
            kartlarım -> route
                üye olmalı
                kaydetme
                silme
            adreslerim -> route
                kaydetme
                    üye değilse uyarı göster
                düzenleme
                silme
            siparişlerim -> route
                sipariş türleri:
                    onay bekliyor
                        iptal edebilir
                            kargo kodu geçersiz kılınmalı
                    kargoya hazırlanıyor
                        iptal edebilir
                            kargo kodu geçersiz kılınmalı
                    kargoya verildi
                    teslim edildi
                        yorum yap -> modal
                    onaylanmadı
                        para iadesi yapılmalı
                detaylar -> modal
                    hangi üründen kaç adet, toplam tutar
                    teslimat adresi
                    fatura adresi
                    ödeme bilgileri
                        hangi kartla yapıldığı
                    onaylanmadı ise sebebi
                    fatura görüntüleme
                iade et -> modal
                    teslimattan sonraki 15 gün içerisinde iade etmesi gerekiyor
                    tercihen sebebi
                    iade adresi
                    birden fazla ürün varsa veya çok adetli ürünler varsa seçebilmeli
                        hangi ürünlerden kaç tane iade edecek
                teslim edilmiş ise, tekrar sipariş ver
                    adedini seçsin
                    direkt ödeme formuna yönlendirilsin
                kargo takibi
            iade taleplerim -> route
                iade ediliyor
                iade edildi
                    iade edilen para tutarı

        sepet -> hoverable
            sepetteki ürünleri görüntüleme
            sepetten ürün çıkarma
                uyarı için inner modal gösterirsin
                    ama hoverable içinde?
            sepetteki ürünün adedini arttırma, azaltma
            sepeti tamamlama
        
        ödeme formu -> modal
            teslimat adresi seçme
                ekleme, düzenleme
            fatura adresi seçme
                ekleme, düzenleme
            kart seçme
                ekleme
                kayıtlı karttan ödeme yaparken, cvv girmesi gerekebilirmiş
            sözleşmeleri onaylama

        bildirim ve mail sistemi
            notification sistemini apple'a entegre etme?
            app:
                sipariş
                    onaylandığında
                    kargoya hazırlanıyor olduğunda
                    kargoya verildiğinde
                        fatura kesilmeli, kullanıcıya iletilmeli
                    teslim edildiğinde
                    onaylanmadığında
                        sebebi yazmalı
                    iade teslimatı ulaştığında
                        para iadesi yapılmalı
            panel:
                giriş yapıldığında register, çıkış yapıldığında unregister olmalı
                yeni sipariş geldiğinde
                yeni iade talebi geldiğinde

panel 
    ürünler
        ürün
            ad 
            açıklama
            stok
            fiyat
            fotoğraf
            kargo ücreti
                ücretsiz olabilir
    siparişler
        ürünler
            adedi
        kargo kodu
        ad soyad
        adres
    iade talepleri
        ürünler
            adedi
        ad soyad
        sebep, varsa
        adres
    kullanıcı yorumları
        ad
        soyad
        yorum
        onayla
        sil

//

tüm kodu kontrol edip yeni konsepte göre ayarla
    app, panel ve common olarak ayır
    aşağıdaki notları düzenle önce

indexeddb'ye, veritabanına ve redis'e bağlayarak git

about us    
gallery
homepage

SliderItemPage slot fallback sil

theme switcher
sola navigasyon?

//

dili hooks'ta html içine koyman lazım
tema desteği olduğunu da html'de bildirmen lazım

animasyonları yap
font'ları gözden geçir

js disabled olduğu zamanı ele al

//

express'e bağla
    static files caching
mail implemente et

optimizasyon, düzenleme:
    program'daki notları gözden geçir

    seo
    responsive images
    service worker implemente et
        offline support

    optimizasyonları gözden geçir
    csp, cors
    minification, compress, caching

    dosyaları gözden geçir
        client, .client dosyalarını, server, .server dosyalarını import etsin
    tüm dosyalara göz at, bu projede kullanılmayanları sil
        kullanılmayan css selector'leri sil
 -->

<Header />

<main class="p-f l-0 t-0 w-h-100">
	<slot />
</main>
