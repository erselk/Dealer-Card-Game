# Dealer - Kart Oyunu

Bu proje, popüler kart oyunu Monopoly Deal'dan esinlenerek geliştirilen, web tabanlı ve online oynanması hedeflenen bir kart oyunudur. Proje şu an, tüm temel ve ileri seviye kuralların işlediği, iki kişinin aynı ekran üzerinden oynayabildiği, baştan sona tamamlanmış bir prototip aşamasındadır.

Bu doküman, projenin **mimarisi, kod akışı, kuralları ve gelecek yol haritasını**, projeyi devralacak bir sonraki geliştiriciye rehber olacak şekilde detaylandırmaktadır.

## 1. Oyun Kuralları ve Mekanikleri

### 1.1. Oyunun Amacı
Oyunun temel amacı, rakiplerinden önce **5 tam mülk setini** tamamlamaktır.

### 1.2. Tur Akışı
Her oyuncunun turu aşağıdaki adımlardan oluşur:
1.  **Kart Çekme:** Turun başında oyuncu destesinden **2 kart** çeker. Eğer oyuncu turuna 0 kart ile başlıyorsa, 5 kart çeker.
2.  **Hamle Yapma:** Oyuncu, turu boyunca en fazla **3 hamle** yapabilir. Olası hamleler şunlardır:
    *   Elindeki bir kartı **Banka**'ya koymak.
    *   Elindeki bir **Tapu** kartını mülk alanına oynamak.
    *   Elindeki bir **Hamle** kartını oynamak.
3.  **Turu Bitirme:** Oyuncu, hamlelerini bitirdikten sonra elinde **7'den fazla kart** varsa, fazla kartları ıskarta destesine atmak zorundadır.

### 1.3. Kart Kategorileri
Oyunda 3 ana kart kategorisi bulunur:
-   **Para Kartları:** Sadece bankaya konulabilirler.
-   **Tapu Kartları:** Mülk setleri oluşturmak için kullanılır. Aynı zamanda para olarak da bankaya konulabilirler.
-   **Hamle Kartları:** Özel aksiyonlar gerçekleştirir. Aynı zamanda para olarak da bankaya konulabilirler.

## 2. Kart Detayları ve Sayıları

Toplam deste **106** karttan oluşur.

### 2.1. Para Kartları (20 Adet)
-   **1M:** 6 adet
-   **2M:** 5 adet
-   **3M:** 3 adet
-   **4M:** 3 adet
-   **5M:** 2 adet
-   **10M:** 1 adet

### 2.2. Tapu Kartları (39 Adet)
-   **Standart Tapular (28 adet):**
    -   Sarı (3 adet, Değer: 3M)
    -   Kırmızı (3 adet, Değer: 3M)
    -   Kahverengi (2 adet, Değer: 1M)
    -   Açık Mavi (3 adet, Değer: 1M)
    -   Gri (2 adet, Değer: 2M)
    -   Siyah (4 adet, Değer: 2M)
    -   Mor (3 adet, Değer: 2M)
    -   Turuncu (3 adet, Değer: 2M)
    -   Koyu Mavi (2 adet, Değer: 4M)
    -   Yeşil (3 adet, Değer: 4M)
-   **Joker Tapular (9 adet):** Bu kartlar iki renk grubuna aittir ve oyuncu istediği renk olarak kullanabilir.
    -   Siyah / Yeşil (1 adet, Değer: 4M)
    -   Koyu Mavi / Yeşil (1 adet, Değer: 4M)
    -   Kahverengi / Açık Mavi (1 adet, Değer: 1M)
    -   Siyah / Gri (1 adet, Değer: 2M)
    -   Siyah / Açık Mavi (1 adet, Değer: 4M)
    -   Kırmızı / Sarı (2 adet, Değer: 3M)
    -   Mor / Turuncu (2 adet, Değer: 2M)
-   **Özel Tapu (2 adet):** Bu kart, oyuncunun istediği herhangi bir renk setini tamamlamak için kullanılabilir. **Para olarak kullanılamaz.**

### 2.3. Hamle Kartları (47 Adet)
-   **Tekrar Çek (10 adet, Değer: 1M):** Oynandığında oyuncu desteden 2 kart daha çeker.
-   **Tahsilat (3 adet, Değer: 3M):** Seçilen bir oyuncudan 5M para istenir.
-   **Doğum Günüm (3 adet, Değer: 2M):** Tüm oyunculardan 2M para istenir.
-   **Tapu Devri (3 adet, Değer: 3M):** Bir oyuncudan, bir setin parçası olmayan bir tapu kartı zorla alınır.
-   **Değiş Tokuş (3 adet, Değer: 3M):** Bir oyuncuyla, setlerin parçası olmayan birer tapu kartı takas edilir.
-   **İki Kat Kira (2 adet, Değer: 1M):** Bir kira kartıyla birlikte oynanarak kira bedelini ikiye katlar.
-   **Haciz (2 adet, Değer: 5M):** Bir oyuncunun tamamlanmış bir mülk setini zorla alır.
-   **Reddet (3 adet, Değer: 4M):** Kendisine karşı oynanan bir hamleyi (kira hariç) iptal eder. Bu kartı oynamak bir hamle sayılmaz.
-   **Ev (3 adet, Değer: 3M):** Tamamlanmış bir setin üzerine konur ve kira değerini 3M artırır. Gri ve Siyah setlere konulamaz.
-   **Otel (2 adet, Değer: 4M):** Üzerinde Ev olan bir setin üzerine konur ve kira değerini 4M artırır.
-   **Kira Kartları (13 adet):**
    -   Kahverengi/Açık Mavi Kira (2 adet, Değer: 1M)
    -   Koyu Mavi/Yeşil Kira (2 adet, Değer: 1M)
    -   Turuncu/Mor Kira (2 adet, Değer: 1M)
    -   Siyah/Gri Kira (2 adet, Değer: 1M)
    -   Sarı/Kırmızı Kira (2 adet, Değer: 1M)
    -   Joker Kira (3 adet, Değer: 3M): Seçilen bir oyuncudan, istenen renkteki kirayı talep eder.

## 3. Kira Değerleri ve Setler

| Renk | Set Boyutu | 1 Kart | 2 Kart | 3 Kart | 4 Kart |
|---|---|---|---|---|---|
| Kahverengi | 2 | 1M | **2M** | - | - |
| Açık Mavi | 3 | 1M | 2M | **3M** | - |
| Mor | 3 | 1M | 2M | **4M** | - |
| Turuncu | 3 | 1M | 3M | **5M** | - |
| Kırmızı | 3 | 2M | 3M | **6M** | - |
| Sarı | 3 | 2M | 4M | **6M** | - |
| Yeşil | 3 | 2M | 4M | **7M** | - |
| Koyu Mavi | 2 | 3M | **8M** | - | - |
| Gri | 2 | 1M | **2M** | - | - |
| Siyah | 4 | 1M | 2M | 3M | **4M** |

**Önemli Not:** Ev ve Otel kartları, **Gri** ve **Siyah** renkli setlerin üzerine koyulamaz.

## 4. Teknik Derin Bakış

### 4.1. Kullanılan Teknolojiler
-   **HTML5:** Oyunun yapısal iskeleti için.
-   **CSS3:** Flexbox tabanlı modern ve responsive layout, animasyonlar ve UI bileşenlerinin stilleri için.
-   **JavaScript (ES6+):** Oyunun tüm mantığı, state yönetimi ve `async/await` tabanlı asenkron kullanıcı etkileşimleri için.

### 4.2. Kod Mimarisi ve Akışı

Proje, tek bir `script.js` dosyası içinde modüler ve anlaşılır bir yapı üzerine kurulmuştur. Temel mimari aşağıdaki prensiplere dayanır:

**A. Merkezi State Yönetimi (`gameState`)**
Oyunun tüm mevcut durumu, `gameState` adında tek bir JavaScript objesi içinde tutulur. Bu obje; oyuncuların ellerini, mülklerini, bankalarını, destenin durumunu ve sıranın kimde olduğunu içerir.
-   **Avantajı:** Herhangi bir anda oyunun tam bir fotoğrafını çekmek ve hataları ayıklamak (debug) çok kolaydır. Tüm arayüz (`updateUI` fonksiyonu aracılığıyla) bu tek objeyi okuyarak kendini yeniler. Bu, veri tutarlılığını garanti eder.

**B. Temel Fonksiyonların Görevleri**
-   `initializeGame()`: Sayfa yüklendiğinde çalışır, `allCards` dizisinden desteyi oluşturur, karıştırır ve oyunculara ilk kartları dağıtır.
-   `updateUI()`: Oyunun görsel arayüzünü A'dan Z'ye güncelleyen fonksiyondur. `gameState` objesindeki verilere bakarak tüm kartları, mülkleri ve bankaları ekrana yeniden çizer. Her hamleden sonra çağrılır.
-   `executeMove(playFunction)`: Bir hamlenin "sarmalayıcısı" (wrapper) olarak görev yapar. İçine verilen oyun fonksiyonunu (`playCardAsProperty` gibi) çalıştırır. Eğer fonksiyon **başarıyla tamamlanırsa** (iptal edilmezse), oyuncunun hamle sayısını artırır ve arayüzü günceller. Bu, "hamle yenmesi" hatasını engeller.
-   `showModal`, `showChoicePrompt`, `showCardSelection`: Tarayıcının standart `alert/prompt`'ları yerine kullanılan modern ve asenkron (`async/await`) pencere fonksiyonlarıdır. Kullanıcıdan seçim yapmasını (kart, renk vb.) bekler ve sonucu bir `Promise` olarak döndürürler. Bu, oyun akışını kesintiye uğratmadan interaktif pencereler oluşturmayı sağlar.

**C. Tipik Bir Oyun Akışı (Event Flow)**
Bir oyuncunun hamle yapması aşağıdaki zincirleme reaksiyonu tetikler:
1.  **Tıklama:** Oyuncu elindeki bir karta tıklar.
2.  **Event Listener:** `handleCardInHandClick` fonksiyonu tetiklenir.
3.  **Kontroller:** Fonksiyon, oyuncunun hamle hakkı olup olmadığını ve kart çekip çekmediğini kontrol eder.
4.  **Modal Pencere:** `showChoicePrompt` çağrılarak oyuncuya "Hamle Yap" veya "Bankaya Koy" gibi seçenekler sunulur. Kod, `await` ile oyuncunun seçimini bekler.
5.  **Hamle Yürütme:** Oyuncunun seçimine göre `executeMove` fonksiyonu, ilgili oyun mantığı fonksiyonuyla (`playActionCard` gibi) çağrılır.
6.  **Oyun Mantığı:** `playActionCard` gibi bir fonksiyon, gerekirse kullanıcıdan tekrar girdi almak için `showCardSelection` gibi başka bir modal penceresi açabilir (örn: "Hangi kartı çalmak istiyorsun?").
7.  **State Güncellemesi:** Hamle başarıyla tamamlandığında, `gameState` objesi güncellenir (örneğin kart elden mülke geçer).
8.  **Arayüz Yenileme:** `executeMove` içindeki `updateUI()` çağrısı ile ekrandaki tüm görseller `gameState`'in son haline göre yeniden çizilir.
9.  **Kazanma Kontrolü:** `checkWinCondition` çalıştırılarak oyunun bitip bitmediği kontrol edilir.

### 4.3. HTML Yapısı ve UI Bileşenleri
`index.html`, oyun alanını mantıksal `div`'lere ayırır:
-   `#opponent-area` / `#player-area`: İki ana oyuncu alanıdır. Kendi içlerinde `player-hand`, `player-properties` ve `bank-area` `div`'lerini barındırırlar.
-   `#table-area`: Oyunun ortasındaki deste (`draw-pile`) ve ıskarta (`discard-pile`) alanlarını içerir.
-   `#notification-area`: Ekranın sağ üstünde çıkan bildirimlerin kapsayıcısıdır.
-   `#modal-backdrop`: Tüm ekranı kaplayan ve interaktif pencereleri (`modal-content`) ortalayan yarı saydam arka plan.

## 5. Proje Yol Haritası ve Gelecek Adımlar

### Faz 4: Öncelikli Geliştirme Yol Haritası (2024)

#### 1. Joker Kartların Tekrar Yer Değiştirilmesi
- [1.1] Tapu alanındaki joker kartlar, setler arasında tekrar taşınabilir olmalı.
- [1.2] UI'da joker kartlar için "taşı" veya "sürükle-bırak" özelliği eklenmeli.

#### 2. Kira Olarak Ödenen Tapuların Doğru Yere Gitmesi
- [2.1] Kira ödemesinde tapu kartları bankaya değil, tapu alanına eklenmeli.
- [2.2] Kira ödemesi sırasında tapu ile para ayrımı netleştirilmeli.

#### 3. Reddet Kartı ve Hamle Onayı
- [3.1] Her hamle sonrası karşı taraftan onay alınmalı (reddet kartı olsa da olmasa da).
- [3.2] Reddet kartı varsa, oyuncu kullanmak isteyip istemediğini seçebilmeli.
- [3.3] Onay mekanizması, rakip kartlarını görmeden çalışmalı.

#### 4. UI ve Görsel İyileştirmeler
- [4.1] Kart sıralaması:
  - En üst: Rakip kart arkaları
  - Altında: Rakip banka
  - Altında: Rakip tapular
  - Orta: Masa (değişmeyecek)
  - Alt: (üstten alta) Tapular, Banka, Kartlar (el)
- [4.2] Kartlar üst üste gelirse, sağdan taşmalı şekilde dizilmeli.
- [4.3] Aynı tür paralar ve tapular üst üste gelsin, üstte adedi yazsın (örn: 3 tane 1M).
- [4.4] Her tapu setinin üstünde n/n (ör: 2/3) sayaç olsun.
- [4.5] Banka ve tapu satırının sağında toplam set sayısı ve toplam para miktarı gösterilsin (örn: 3/5 set, 12M para).

**Uygulama Sırası:**
1. Joker kartların tekrar taşınabilmesi
2. Kira ödemesinde tapuların doğru yere gitmesi
3. Reddet ve hamle onay sistemi
4. UI ve görsel iyileştirmeler (tüm alt başlıklar)

Her adımda:
- Önce ana sürümde (script.js, index.html, style.css)
- Sonra test sürümünde (test/test-script.js, test/test-index.html, test/test-style.css)
- Gerekirse ortak fonksiyonlar refactor edilecek

---

### Faz 5: Test ve Sağlamlaştırma (Sıradaki Adım)
Bu fazın amacı, mevcut kod tabanının kararlılığını artırmak ve gelecekteki değişikliklerin mevcut işlevleri bozmamasını sağlamaktır.

- [ ] **Test Altyapısı Kurulumu:**
    - Projeye `Vitest` veya `Jest` gibi modern bir JavaScript test kütüphanesi entegre edilmeli. (`npm init`, `npm install -D vitest` vb.)
    - Testlerin kolayca çalıştırılabilmesi için `package.json` dosyasına `"test": "vitest"` gibi bir script eklenmeli.
- [ ] **Birim (Unit) Testleri:**
    - Oyunun saf mantık fonksiyonları için birim testleri yazılmalı. Bu testler, UI'dan bağımsız olarak sadece veri giriş-çıkışlarını kontrol etmelidir.
    - **Test Edilecek Fonksiyonlar:** `calculateRent`, `isSetCompleted`, `checkWinCondition`.
    - **Örnek Test Senaryoları:**
        - Bir sete ev eklendiğinde `calculateRent` doğru kirayı hesaplıyor mu?
        - Joker tapu içeren bir set `isSetCompleted` tarafından doğru şekilde "tamamlandı" olarak işaretleniyor mu?
        - 4 tam seti olan oyuncu için `checkWinCondition` false dönüyor mu? 5 set için true dönüyor mu?
- [ ] **Entegrasyon Testleri:**
    - Bir oyuncunun tam bir hamle döngüsünü simüle eden, birden çok fonksiyonun birlikte çalışmasını test eden senaryolar yazılmalı.
    - **Test Edilecek Akışlar:**
        - "Haciz" kartı oynandığında, modal pencerenin doğru setleri gösterdiğini, seçim yapıldıktan sonra `gameState`'in doğru güncellendiğini ve `updateUI`'ın bu değişikliği yansıttığını (DOM manipülasyonu test kütüphaneleri ile) kontrol et.
        - Kira ödemesi sırasında bankası yetmeyen oyuncunun mülklerinden ödeme yapmasının test edilmesi.

### Faz 6: Online Oyun ve Çok Oyunculu Altyapı
- [ ] **Sunucu Altyapısı:**
    - `Node.js` ve `Express` ile basit bir sunucu kurulmalı.
    - `WebSocket` (örneğin `ws` veya `Socket.IO` kütüphanesi ile) entegrasyonu yapılmalı.
- [ ] **State Yönetiminin Merkezileştirilmesi:**
    - `gameState` objesi artık sunucu tarafında tutulmalı ve tüm oyun mantığı sunucuda çalışmalı.
    - İstemci (tarayıcı), sadece kullanıcı eylemlerini ("şu karta tıkladım") sunucuya iletmeli (`socket.emit`).
    - Sunucu, hamleyi doğrulayıp `gameState`'i güncellemeli ve yeni durumu odadaki tüm oyunculara yayınlamalı.
- [ ] **Oyun Odası ve Eşleştirme Mantığı:**
    - Oyuncuların oyun odaları oluşturup/katılabileceği bir lobi sistemi kurulmalı.

### Faz 7: Son Dokunuşlar ve Kullanıcı Deneyimi
- [ ] **Animasyonlar:** Kartların çekilmesi, oynanması, elden ele geçmesi gibi aksiyonlara akıcı CSS animasyonları eklenmeli.
- [ ] **Ses Efektleri:** Kart çekme, para kazanma, hamle yapma gibi olaylar için basit ses efektleri eklenmeli.
- [ ] **Responsive Tasarım İyileştirmeleri:** Oyunun farklı ekran boyutlarında (özellikle mobil cihazlarda) düzgün görünmesi için CSS güncellemeleri yapılmalı.
- [ ] **Hata Yönetimi:** Sunucu bağlantı kopmaları veya geçersiz hamle denemeleri gibi durumlar için kullanıcı dostu hata mesajları gösterilmeli.

Bu README dosyası, projenin ilerlemesiyle birlikte güncellenecektir. 