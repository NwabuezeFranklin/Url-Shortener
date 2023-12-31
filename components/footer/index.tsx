import Link from 'next/link'
import Image from 'next/image'
import illustRight from '@/public/footer/right-illust.svg'
import illustLeft from '@/public/footer/left-illust.svg'
import Logo from '@/public/footer/Logo.svg'
import Twitter from '@/public/footer/twitter.svg'
import Instagram from '@/public/footer/instagram.svg'
import Linkedin from '@/public/footer/linkedin.svg'
import Facebook from '@/public/footer/facebook.svg'

const Footer = () => {
  return (
    <footer className="w-full relative flex justify-between items-center text-[#112232] text-sm px-8 flex-col pt-[55px] pb-10 lg:flex-row lg:items-start lg:px-[93px] lg:gap-x-5 lg:pt-[95px] lg:pb-10 2xl:gap-x-[63px]">
      <Image
        src={illustRight}
        alt=""
        className="absolute max-w-full max-h-full bottom-0 right-0"
      />
      <Image
        src={illustLeft}
        alt=""
        className="absolute max-w-full max-h-full bottom-0 left-0"
      />
      <div className="z-[1] flex gap-y-4 items-center flex-col lg:items-start lg:gap-y-10">
        <Link href={'/#hero'}>
          <Image src={Logo} alt="Scissor Logo" />
        </Link>
        <div className="flex items-center gap-x-3 lg:gap-x-6 cursor-pointer">
          <Image src={Twitter} alt="Twitter Icon" />
          <Image src={Instagram} alt="instagram Icon" />
          <Image src={Linkedin} alt="linkedin Icon" />
          <Image src={Facebook} alt="facebook Icon" />
        </div>
      </div>
      <div className=" z-[1] flex text-center mt-8 lg:text-left lg:mt-0 flex-col lg:gap-y-14">
        <div className="flex flex-col gap-y-2 mb-4 lg:mb-0">
          <h4 className="text-[#071827] font-semibold text-base">
            Why Scissor ?
          </h4>
          <Link href="/">Scissor 101 </Link>
          <Link href="/">Integrations & API </Link>
          <Link href="/">Pricing</Link>
        </div>
        <div className="flex flex-col gap-y-2">
          <h4 className="text-[#071827] font-semibold text-base">Resources</h4>
          <Link href="/">Blog </Link>
          <Link href="/">Resource Library</Link>
          <Link href="/">Developers</Link>
          <Link href="/">App Connectors </Link>
          <Link href="/">Support </Link>
          <Link href="/">Trust Center </Link>
          <Link href="/"> Browser Extension </Link>
          <Link href="/">Mobile App </Link>
        </div>
      </div>
      <div className="z-[1] flex flex-col items-center text-center mt-4 lg:mt-0 lg:items-start lg:text-left lg:gap-y-14">
        <div className="flex flex-col gap-y-2 mb-4 lg:mb-0">
          <h4 className="text-[#071827] font-semibold text-base ">Solutions</h4>
          <Link href="/">Social Media </Link>
          <Link href="/">Digital Marketing </Link>
          <Link href="/">Customer Service</Link>
          <Link href="/">For Developers</Link>
        </div>
        <div className="flex flex-col gap-y-2">
          <h4 className="text-[#071827] font-semibold text-base">Features</h4>
          <Link href="/">Branded Links </Link>
          <Link href="/">Mobile Links</Link>
          <Link href="/">Campaign Management & Analytic</Link>
          <Link href="/">QR Code generation </Link>
        </div>
      </div>
      <div className="z-[1] flex flex-col items-center text-center mt-4 lg:mt-0 lg:items-start lg:text-left lg:gap-y-14">
        <div className="flex flex-col gap-y-2">
          <h4 className="text-[#071827] font-semibold text-base">Products</h4>
          <Link href="/">Link Management </Link>
          <Link href="/">QR Codes </Link>
          <Link href="/">Link-in-bio </Link>
        </div>
        <div className="flex flex-col gap-y-2 mt-4 lg:mt-0">
          <h4 className="text-[#071827] font-semibold text-base">Legal</h4>
          <Link href="/">Privacy Policy</Link>
          <Link href="/">Cookie Policy</Link>
          <Link href="/">Terms of Servicec</Link>
          <Link href="/"> Acceptable Use Policy</Link>
          <Link href="/"> Code of Conduct </Link>
        </div>
      </div>
      <div className="z-[1] flex flex-col gap-y-2 items-center text-center mt-4 lg:mt-0 lg:items-start lg:text-left">
        <h4 className="text-[#071827] font-semibold text-base">Company</h4>
        <Link href="/">About Scissor </Link>
        <Link href="/">Careers </Link>
        <Link href="/">Partners </Link>
        <Link href="/">Press </Link>
        <Link href="/">Contact </Link>
        <Link href="/">Reviews </Link>
      </div>
    </footer>
  )
}

export default Footer
