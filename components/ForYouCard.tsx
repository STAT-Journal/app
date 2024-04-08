import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const journalStories = [
  {
    title: "A Day in the Mountains",
    description: "Today I woke up early to the crisp mountain air. The sun was just beginning to rise, casting a golden hue on the tall pine trees. I brewed a fresh pot of coffee and sat on the porch, listening to the sounds of nature. After breakfast, I packed my backpack and set off on a hiking adventure. The trails were serene, with occasional glimpses of wildlife. I reached the summit just in time for a breathtaking view of the valley below. What a perfect day in the mountains!",
  },
  {
    title: "Exploring a Hidden Waterfall",
    description: "I stumbled upon a hidden gem today - a secluded waterfall tucked away in the heart of the forest. The trail was narrow and winding, with wildflowers lining the path. As I approached the waterfall, I could hear the soothing sound of rushing water. The sight took my breath away - a cascade of crystal-clear water plunging into a serene pool below. I spent hours basking in the beauty of nature, feeling a sense of peace wash over me.",
  },
  {
    title: "A Peaceful Evening by the Lake",
    description: "The evening was calm and tranquil as I sat by the lake, watching the sun slowly dip below the horizon. The water shimmered with reflections of the colorful sky. I cast my fishing line and waited patiently, enjoying the solitude. As the stars emerged one by one, I lit a small campfire and roasted marshmallows. The crackling of the fire and the gentle lapping of the waves lulled me into a state of pure relaxation. This is where I belong.",
  },
  {
    title: "Sunrise Serenity at the Clifftops",
    description: "Waking up before dawn, I ventured to the clifftops for a mesmerizing sunrise experience. The world was quiet, save for the distant calls of waking birds. As the first light painted the sky in hues of pink and orange, I felt a deep sense of peace wash over me. The cliffs stretched out before me, revealing layers of ancient rock formations. It was a moment of pure serenity, a silent communion with nature's grandeur.",
  },
  {
    title: "Lost in the Labyrinthine Caves",
    description: "Today I delved into the depths of the earth, exploring a labyrinth of hidden caves. With only a headlamp to guide me, I ventured deeper into the darkness, feeling the cool touch of ancient stone. The caves whispered with secrets, their walls adorned with glistening stalactites and stalagmites. At times, I crawled through narrow passages and squeezed through tight crevices, feeling a sense of exhilaration with each new discovery. Lost in this underground world, I marveled at the wonders hidden beneath our feet.",
  },
  {
    title: "Dancing under the Northern Lights",
    description: "Far from city lights, I found myself under the spell of the dancing auroras. The night sky came alive with ribbons of green and purple light, swirling and twirling like celestial dancers. I stood in awe, feeling the magic of the universe envelop me. It was a dance of colors, a symphony of light and shadow playing out across the vast expanse of the Arctic sky. In that moment, I felt infinitely small yet intimately connected to the cosmos.",
  },
  {
    title: "Encounter with Majestic Wildlife",
    description: "As I trekked through the wilderness, I had a close encounter with nature's royalty. A magnificent stag emerged from the thickets, its antlers reaching towards the sky in regal splendor. Time seemed to stand still as we locked eyes, a silent understanding passing between us. The stag, unbothered by my presence, continued its graceful stride through the forest, disappearing into the dappled light. It was a moment of raw, untamed beauty that left me humbled and filled with awe.",
  },
  {
    title: "Sailing into the Sunset",
    description: "Setting sail on calm waters, I watched as the sun dipped below the horizon, painting the sky in a palette of fiery hues. The boat glided effortlessly, leaving ripples in its wake as we sailed towards the horizon. Seagulls soared overhead, their cries mingling with the gentle lapping of the waves against the hull. The air was tinged with salt and adventure, a feeling of freedom washing over me with each passing moment. As the sun bid its farewell, casting a golden path on the water, I knew that this was a moment to cherish, a memory etched in the heart.",
  },
  {
    title: "Amidst Fields of Lavender",
    description: "Today I wandered through fields of lavender, their fragrance filling the air with sweetness. The vibrant purple flowers stretched as far as the eye could see, swaying gently in the breeze. Bees buzzed lazily from blossom to blossom, collecting nectar in a harmonious dance of nature. I closed my eyes, breathing in deeply, feeling a sense of calm wash over me. It was a moment of pure bliss, surrounded by the beauty and tranquility of the lavender fields.",
  },
  {
    title: "Campfire Tales under a Starlit Sky",
    description: "Gathered around the crackling campfire, we shared tales under a canopy of twinkling stars. Shadows danced against the trees as we recounted adventures of old and dreams of the future. The fire cast a warm glow on our faces, creating an atmosphere of camaraderie and warmth. With each story told, the night grew deeper, and the stars seemed to shine brighter. It was a night of laughter, shared memories, and the magic of storytelling under the vast, starlit sky.",
  },
  {
    title: "Whispers of Ancient Ruins",
    description: "Exploring the remnants of ancient ruins, I felt the weight of history upon my shoulders. Stone pillars stood tall against the backdrop of a setting sun, their weathered surfaces bearing the marks of time. As I walked among the ruins, I could almost hear the whispers of the past, tales of civilizations long gone. Nature had begun to reclaim its territory, with vines weaving through cracks in the stone. It was a humbling experience, standing amidst the remnants of a bygone era, feeling a deep connection to those who walked these paths centuries before.",
  },
  {
    title: "A Serenade of Birdsong",
    description: "Waking to a symphony of bird songs, I knew it would be a day filled with nature's melodies. The air was alive with chirps, trills, and calls, each bird adding its unique note to the chorus. I followed the sound through the forest, feeling as though I was part of this avian orchestra. Perched on a moss-covered rock, I closed my eyes and let the music wash over me. It was a reminder of the beauty and harmony of the natural world, a serenade that filled my heart with joy.",
  },
  // Add more journal stories as needed
];

let lastDisplayedIndex = -1;

const getRandomStory = () => {
  let randomIndex = Math.floor(Math.random() * journalStories.length);

  // If lastDisplayedIndex exists, ensure the next random story is different
  if (lastDisplayedIndex !== -1) {
    randomIndex = (lastDisplayedIndex + 1) % journalStories.length;
  }

  // Update lastDisplayedIndex for next time
  lastDisplayedIndex = randomIndex;

  return journalStories[randomIndex];
};




interface ForYouCardProps {}

const ForYouCard: React.FC<ForYouCardProps> = () => {
  const { title, description } = getRandomStory();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ForYouCard;
