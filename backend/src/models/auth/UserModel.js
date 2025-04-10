import mongoose from "mongoose";
import bcrypt from "bcrypt";

const profilePhotos = [
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
  "https://cutegirlpic.in/wp-content/uploads/2024/08/Anime-Dp-7.webp", 
  "https://m.media-amazon.com/images/M/MV5BZjA0MDgyYmItNzkzMC00OTM2LThlYzktMWMxZWU3ZGNkNDI3XkEyXkFqcGc@._V1_.jpg",
  "https://i.pinimg.com/736x/bf/50/59/bf5059b64e3dab6a61d1724920602690.jpg",
  "https://cdn.lazyshop.com/files/9b0d8bde-34c0-460a-b131-e7a87b1e0543/other/9f2af6d1aac70338f940db94300766a6.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMkjVzu3K0ORwignyN05PR2rWc6950Vcq4kg&s",
  "https://staticg.sportskeeda.com/editor/2022/05/11b98-16528121318872-1920.jpg?w=640",
  "https://vsthemes.org/uploads/posts/2017-09/1582033814_naruto_vsthemes_ru-30.webp",
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
