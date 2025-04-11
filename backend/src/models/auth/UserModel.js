import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Add all your profile image URLs here
const profilePhotos = [
  // Existing images (you can keep them as-is)
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    "https://i.pinimg.com/474x/16/06/17/16061799e50922ffc1621f9cf937e5f1.jpg",
    "https://i.pinimg.com/236x/fc/6f/c6/fc6fc66bf4b6eb6ba09bf6389e18f79a.jpg",
    "https://images.hitpaw.com/topics/3d/profile-photo-1.jpg",
    "https://media.istockphoto.com/id/526947869/vector/man-silhouette-profile-picture.jpg?s=612x612&w=0&k=20&c=5I7Vgx_U6UPJe9U2sA2_8JFF4grkP7bNmDnsLXTYlSc=",
    "https://i.pinimg.com/474x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJvEgbkiQ4WknLS7YPLCZCyFL6kqHGKuCU0ODxEjfaGjn1S5bHB3O2XvIhYBFArE-XrSU&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzNggCLZF8ZMU1N1SihVAqL0XjJtBqdqh8yguiIy8hMTiA7Vnij5HRDw-onik0hXQXFqw&usqp=CAU",
    "https://photosbull.com/wp-content/uploads/2024/05/anime-dp-4.jpg",
    "https://cutegirlpic.in/wp-content/uploads/2024/08/Anime-Dp-7.webp",
    "https://cutegirlpic.in/wp-content/uploads/2024/08/Anime-Dp-1.webp",
    "https://i.pinimg.com/736x/bf/50/59/bf5059b64e3dab6a61d1724920602690.jpg",
    "https://cdn.lazyshop.com/files/9b0d8bde-34c0-460a-b131-e7a87b1e0543/other/9f2af6d1aac70338f940db94300766a6.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMkjVzu3K0ORwignyN05PR2rWc6950Vcq4kg&s",
    "https://staticg.sportskeeda.com/editor/2022/05/11b98-16528121318872-1920.jpg?w=640",
    "https://vsthemes.org/uploads/posts/2017-09/1582033814_naruto_vsthemes_ru-30.webp",

    // Newly added 8 images
    "https://i0.wp.com/news.vocofm.com/wp-content/uploads/2024/03/%E6%88%AA%E5%9C%96-2024-03-12-%E4%B8%8A%E5%8D%8811.36.32.png?fit=800%2C554&ssl=1",
    "https://i.pinimg.com/736x/71/62/9c/71629c075c537d608f4bbda8943201e8.jpg",
    "https://i.scdn.co/image/ab6761610000e5eb9e33dd3ae51452774a133e1f",
    "https://variety.com/wp-content/uploads/2024/02/Lalisa-Manobal-headshot-credit-Vivi-Suthathip-Saepung-e1707758978642.jpg?w=1000&h=667&crop=1",
    "https://m.media-amazon.com/images/M/MV5BZjA0MDgyYmItNzkzMC00OTM2LThlYzktMWMxZWU3ZGNkNDI3XkEyXkFqcGc@._V1_.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwkXnULjA36OshkkdyekzuIHxyVPQqPfp5S-vVZo41fk3MO6LNYM_IH1pFqFmcT0DmEFY&usqp=CAU",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Movie_%E2%80%9CBlue_Porno%E2%80%9D_Stage_Greetings_Ikebukuro_Cinema_Rosa_IMG_9655-1.jpg/1200px-Movie_%E2%80%9CBlue_Porno%E2%80%9D_Stage_Greetings_Ikebukuro_Cinema_Rosa_IMG_9655-1.jpg",
    "https://is.zobj.net/image-server/v1/images?r=GTqpgKA1lAhXMzmiA7wDB32mURJS3qQE5paYmekSm354va-C2npQOJry2dXnMIyaLqw4qMuDvh96jM7LWSo-Xe_kjJP4ofocuflGacGftGsC16ADO_TVtgSzMv_2jsLUPyuvi6lhVI6tiqCb0YAaJPtNMs6lhHjh6sd3uJBYq8zy7OE-ZuKsZapuvxQtzgrcha9udWeahs5ZhX2Q13ax_BenUI3hD6SqjbadbF4ttP4hwD9dKltRlaWMKCA",

  // ✅ LAST IMAGE: 50% probability
  "https://i0.wp.com/news.vocofm.com/wp-content/uploads/2024/03/%E6%88%AA%E5%9C%96-2024-03-12-%E4%B8%8A%E5%8D%8811.36.32.png?fit=800%2C554&ssl=1",
  "https://i.pinimg.com/736x/71/62/9c/71629c075c537d608f4bbda8943201e8.jpg",
  "https://i.scdn.co/image/ab6761610000e5eb9e33dd3ae51452774a133e1f",
  "https://variety.com/wp-content/uploads/2024/02/Lalisa-Manobal-headshot-credit-Vivi-Suthathip-Saepung-e1707758978642.jpg?w=1000&h=667&crop=1",
  "https://m.media-amazon.com/images/M/MV5BZjA0MDgyYmItNzkzMC00OTM2LThlYzktMWMxZWU3ZGNkNDI3XkEyXkFqcGc@._V1_.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwkXnULjA36OshkkdyekzuIHxyVPQqPfp5S-vVZo41fk3MO6LNYM_IH1pFqFmcT0DmEFY&usqp=CAU",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Movie_%E2%80%9CBlue_Porno%E2%80%9D_Stage_Greetings_Ikebukuro_Cinema_Rosa_IMG_9655-1.jpg/1200px-Movie_%E2%80%9CBlue_Porno%E2%80%9D_Stage_Greetings_Ikebukuro_Cinema_Rosa_IMG_9655-1.jpg",
  "https://is.zobj.net/image-server/v1/images?r=GTqpgKA1lAhXMzmiA7wDB32mURJS3qQE5paYmekSm354va-C2npQOJry2dXnMIyaLqw4qMuDvh96jM7LWSo-Xe_kjJP4ofocuflGacGftGsC16ADO_TVtgSzMv_2jsLUPyuvi6lhVI6tiqCb0YAaJPtNMs6lhHjh6sd3uJBYq8zy7OE-ZuKsZapuvxQtzgrcha9udWeahs5ZhX2Q13ax_BenUI3hD6SqjbadbF4ttP4hwD9dKltRlaWMKCA",

];


const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add password!"],
    },
    photo: {
      type: String,
    },
    bio: {
      type: String,
      default: "I am a new user.",
    },
    role: {
      type: String,
      enum: ["user", "admin", "creator"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, minimize: true }
);

// Pre-save middleware to hash password and assign random photo
UserSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // Assign a random photo if not set
  if (!this.photo) {
    const randomIndex = Math.floor(Math.random() * profilePhotos.length);
    this.photo = profilePhotos[randomIndex];
  }

  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
