const fs = require('fs');

// Read the products data
const data = JSON.parse(fs.readFileSync('products_data.json', 'utf8'));

console.log('=== ANALISIS PRODUK DENGAN URL LAMA ===\n');

let oldUrlCount = 0;
let newUrlCount = 0;
let missingImageCount = 0;

const problemProducts = [];

data.data.forEach(product => {
  const hasOldUrl = product.gambar && product.gambar.includes('drwgroup.id');
  const hasFotoProduk = product.fotoProduk && product.fotoProduk.length > 0;
  
  if (hasOldUrl && !hasFotoProduk) {
    oldUrlCount++;
    problemProducts.push({
      id: product.id,
      name: product.namaProduk,
      type: product.type,
      gambar: product.gambar,
      fotoProduk: product.fotoProduk
    });
  } else if (hasFotoProduk) {
    newUrlCount++;
  } else {
    missingImageCount++;
  }
});

console.log('RINGKASAN:');
console.log(`- Produk dengan URL lama (drwgroup.id) tanpa foto_produk: ${oldUrlCount}`);
console.log(`- Produk sudah menggunakan foto_produk (Google Storage): ${newUrlCount}`);
console.log(`- Produk tanpa gambar sama sekali: ${missingImageCount}`);
console.log(`- Total produk: ${data.data.length}\n`);

if (problemProducts.length > 0) {
  console.log('=== DAFTAR PRODUK BERMASALAH (menggunakan URL lama) ===\n');
  problemProducts.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name}`);
    console.log(`   ID: ${product.id}`);
    console.log(`   Type: ${product.type}`);
    console.log(`   URL Lama: ${product.gambar}`);
    console.log(`   Foto Produk: ${product.fotoProduk.length} item`);
    console.log('');
  });
}
