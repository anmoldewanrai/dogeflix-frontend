import { Button } from '../ui/Button'

export function CTA() {
	return (
		<div>
			<section>
				<div className="mt-24 max-w-4xl mx-auto relative px-10 py-10 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 shadow-lg">
					<img
						className="absolute inset-0 m-auto ml-12 z-10 -mt-6 h-12 w-12"
						src="https://free3dicon.com/wp-content/uploads/2021/07/video_camera_perspective_matte_s-2-300x300.png.webp"
					/>
					<div className="lg:flex items-center z-10">
						<div className="lg:w-1/2 lg:mr-12">
							<h2
								className="text-3xl font-extrabold text-white"
								id="join-heading"
							>
								Let&apos;s get started
							</h2>
							<p className="text-lg text-white">
								Start watching your favorite trailers now!
							</p>
						</div>
						<div className="lg:w-1/2 flex items-start sm:items-center lg:justify-end mt-6 xl:mt-0">
							<Button href="/home" size="xl" variant="white">
								Watch Now
							</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
