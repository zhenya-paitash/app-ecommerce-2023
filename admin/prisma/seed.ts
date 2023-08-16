const { PrismaClient } = require("@prisma/client");

const prismadb = new PrismaClient();

const userId = process.env.DATABASE_SEED_USER;

async function main() {
  try {

    // CLEAR ALL
    console.log(`[DATABASE]: Clear database...`);
    await prismadb.orderItems.deleteMany();
    await prismadb.order.deleteMany();
    await prismadb.image.deleteMany();
    await prismadb.product.deleteMany();
    await prismadb.category.deleteMany();
    await prismadb.billboard.deleteMany();
    await prismadb.color.deleteMany();
    await prismadb.size.deleteMany();
    await prismadb.store.deleteMany();
    console.log(`[DATABASE]: Database is cleared!`);

    console.log(`[DATABASE]: Start seeding data...`);
    // SEED DATA
    // store
    const store = await prismadb.store.create({
      data: {
        name: "Default Store",
        userId,
      }
    });

    // billboards
    const billboardShirts = await prismadb.billboard.create({data: {
      label: "Choose your style!",
      imageUrl: "https://res.cloudinary.com/diis6bfer/image/upload/v1692027117/app-ecommerce-2023/billboard-shirts_eubrax.webp",
      storeId: store.id,
    }});
    const billboardShoes = await prismadb.billboard.create({data: {
      label: "Comfortable and stylish!",
      imageUrl: "https://res.cloudinary.com/diis6bfer/image/upload/v1692183010/app-ecommerce-2023/billboard-shoes_wha8mr.webp",
      storeId: store.id,
    }});

    // categories
    const categoryShirts = await prismadb.category.create({data: {
      name: "T-Shirts",
      billboardId: billboardShirts.id,
      storeId: store.id,
    }});
    const categoryShoes = await prismadb.category.create({data: {
      name: "Shoes",
      billboardId: billboardShoes.id,
      storeId: store.id,
    }});

    // colors
    const colorSkyBlue = await prismadb.color.create({data: {
      name: "Sky Blue",
      value: "#ABC6E1",
      storeId: store.id,
    }});
    const colorLightRust = await prismadb.color.create({data: {
      name: "Light Rust",
      value: "#E4926D",
      storeId: store.id,
    }});
    const colorFrenchNavy = await prismadb.color.create({data: {
      name: "French Navy",
      value: "#212E5B",
      storeId: store.id,
    }});
    const colorBossaNova = await prismadb.color.create({data: {
      name: "Bossa Nova",
      value: "#9F332B",
      storeId: store.id,
    }});
    const colorPurpleHeather = await prismadb.color.create({data: {
      name: "Purple Heather",
      value: "#ABA7C0",
      storeId: store.id,
    }});
    const colorRoseSmoke = await prismadb.color.create({data: {
      name: "Rose Smoke",
      value: "#E0C8C3",
      storeId: store.id,
    }});

    // sizes
    const sizeXS = await prismadb.size.create({data: {
      name: "Extra Small",
      value: "XS",
      storeId: store.id,
    }});
    const sizeS = await prismadb.size.create({data: {
      name: "Small",
      value: "S",
      storeId: store.id,
    }});
    const sizeM = await prismadb.size.create({data: {
      name: "Medium",
      value: "M",
      storeId: store.id,
    }});
    const sizeL = await prismadb.size.create({data: {
      name: "Large",
      value: "L",
      storeId: store.id,
    }});
    const sizeXL = await prismadb.size.create({data: {
      name: "Extra Large",
      value: "XL",
      storeId: store.id,
    }});

    // products
    // products t-shirts
    await prismadb.product.create({data: {
      name: "M3600 (FREDD PERRY)",
      price: "82.49",
      isFeatured: true,
      storeId: store.id,
      categoryId: categoryShirts.id,
      colorId: colorSkyBlue.id,
      sizeId: sizeM.id,
      images: {
        createMany: {
          data: [
            "https://res.cloudinary.com/diis6bfer/image/upload/v1692027118/app-ecommerce-2023/shirt-1-1_yniogq.webp",
            "https://res.cloudinary.com/diis6bfer/image/upload/v1692027118/app-ecommerce-2023/shirt-1-2_w60ab5.webp",
            "https://res.cloudinary.com/diis6bfer/image/upload/v1692027118/app-ecommerce-2023/shirt-1-3_cjmx7w.webp",
          ].map(i => ({ url: i })),
        }
      }
    }});
    await prismadb.product.create({data: {
      name: "M3600 (FREDD PERRY)",
      price: "82.49",
      isFeatured: true,
      storeId: store.id,
      categoryId: categoryShirts.id,
      colorId: colorLightRust.id,
      sizeId: sizeL.id,
      images: {
        createMany: {
          data: [
            "https://res.cloudinary.com/diis6bfer/image/upload/v1692027119/app-ecommerce-2023/shirt-2-1_zcnbir.webp",
            "https://res.cloudinary.com/diis6bfer/image/upload/v1692027120/app-ecommerce-2023/shirt-2-2_xpovrj.webp",
            "https://res.cloudinary.com/diis6bfer/image/upload/v1692027120/app-ecommerce-2023/shirt-2-3_iukgib.webp",
          ].map(i => ({ url: i })),
        }
      }
    }});
    await prismadb.product.create({data: {
      name: "M3600 (FREDD PERRY)",
      price: "82.49",
      isFeatured: true,
      storeId: store.id,
      categoryId: categoryShirts.id,
      colorId: colorFrenchNavy.id,
      sizeId: sizeS.id,
      images: {
        createMany: {
          data: [
            "https://res.cloudinary.com/diis6bfer/image/upload/v1692027120/app-ecommerce-2023/shirt-3-1_az492c.webp",
            "https://res.cloudinary.com/diis6bfer/image/upload/v1692027120/app-ecommerce-2023/shirt-3-2_lfw74c.webp",
            "https://res.cloudinary.com/diis6bfer/image/upload/v1692027121/app-ecommerce-2023/shirt-3-3_k7trgn.webp",
          ].map(i => ({ url: i })),
        }
      }
    }});

    // products shoes
    await prismadb.product.create({data: {
      name: "OLD SKOOL SHOE (VANS)",
      price: "70",
      isFeatured: true,
      storeId: store.id,
      categoryId: categoryShoes.id,
      colorId: colorBossaNova.id,
      sizeId: sizeS.id,
      images: {
        createMany: {
          data: [
            "https://res.cloudinary.com/diis6bfer/image/upload/v1692027121/app-ecommerce-2023/shoes-1-1_ukly4x.webp",
            "https://res.cloudinary.com/diis6bfer/image/upload/v1692027117/app-ecommerce-2023/shoes-1-2_qcabfv.webp",
          ].map(i => ({ url: i })),
        }
      }
    }});
    await prismadb.product.create({data: {
      name: "OLD SKOOL SHOE (VANS)",
      price: "70",
      isFeatured: true,
      storeId: store.id,
      categoryId: categoryShoes.id,
      colorId: colorPurpleHeather.id,
      sizeId: sizeL.id,
      images: {
        createMany: {
          data: [
            "https://res.cloudinary.com/diis6bfer/image/upload/v1692027117/app-ecommerce-2023/shoes-2-1_ha5mkc.webp",
            "https://res.cloudinary.com/diis6bfer/image/upload/v1692027117/app-ecommerce-2023/shoes-2-2_vnpjq7.webp",
          ].map(i => ({ url: i })),
        }
      }
    }});
    await prismadb.product.create({data: {
      name: "OLD SKOOL SHOE (VANS)",
      price: "70",
      isFeatured: true,
      storeId: store.id,
      categoryId: categoryShoes.id,
      colorId: colorRoseSmoke.id,
      sizeId: sizeXL.id,
      images: {
        createMany: {
          data: [
            "https://res.cloudinary.com/diis6bfer/image/upload/v1692027117/app-ecommerce-2023/shoes-3-1_q3enu6.webp",
            "https://res.cloudinary.com/diis6bfer/image/upload/v1692027118/app-ecommerce-2023/shoes-3-2_khnylm.webp",
          ].map(i => ({ url: i })),
        }
      }
    }});

    console.log(`[DATABASE]: Done!`);
  } catch (error: any) {
    console.error(error.message)
  }
}

main();