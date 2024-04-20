import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

await imagemin(['public/*.{jpg,png}'], {
	destination: 'public/optimized',
	plugins: [
		imageminWebp({quality: 70})
	]
});

console.log('Images optimized');