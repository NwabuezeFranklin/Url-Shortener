import Image from 'next/image'
import illustRight from '@/public/CTA/right-illust.svg'
import illustLeft from '@/public/CTA/left-illust.svg'

const CTA = () => {
  return (
    <section className="relative shorten w-full text-white flex flex-col justify-center items-center gap-y-8 min-h-[300px]">
      <div className="absolute inset-0">
        <Image
          src={illustRight}
          alt=""
          className="w-full h-full object-cover"
          layout="fill"
        />
      </div>
      <div className="absolute inset-0">
        <Image
          src={illustLeft}
          alt=""
          className="w-full h-full object-cover"
          layout="fill"
        />
      </div>
      <h4 className="text-2xl lg:text-4xl xl:text-[40px] text-center px-6">
        Revolutionizing Link Optimization
      </h4>
      <button className="py-3 px-8 bg-primaryColor rounded-full">
        Get Started
      </button>
    </section>
  )
}

export default CTA
