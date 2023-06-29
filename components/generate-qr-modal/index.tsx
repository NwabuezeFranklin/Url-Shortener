import { useState, useEffect } from 'react'
import { FaDownload } from 'react-icons/fa'
import { saveAs } from 'file-saver'
import { toast } from 'react-toastify'

interface GenerateQRModalProps {
  showQRcodeModal: boolean
  setShowQRCodeModal: (showQRcodeModal: boolean) => void
  QRCodeImageLink: string
}

const GenerateQRCodeModal = ({
  showQRcodeModal,
  setShowQRCodeModal,
  QRCodeImageLink,
}: GenerateQRModalProps) => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false)
  const [windowWidth, setWindowWidth] = useState<number>(0)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleDownload = () => {
    setIsDownloading(true)
    try {
      // Rest of the code...

      const qrCodeImage: HTMLImageElement = new Image()
      qrCodeImage.crossOrigin = 'anonymous'
      qrCodeImage.src = QRCodeImageLink
      qrCodeImage.onload = () => {
        // Rest of the code...

        const qrCodeWidth = windowWidth >= 640 ? 200 : 150
        const qrCodeHeight = qrCodeWidth
        const qrCodeX = centerX - qrCodeWidth / 2
        const qrCodeY = brandNameY + (windowWidth >= 640 ? 30 : 20)
        ctx!.drawImage(qrCodeImage, qrCodeX, qrCodeY, qrCodeWidth, qrCodeHeight)

        // Rest of the code...
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong!')
    }
  }

  return (
    <div
      className={`fixed z-[200] inset-0 items-center justify-center ${
        showQRcodeModal ? 'flex' : 'hidden'
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-75"></div>
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-6 min-w-[300px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-primaryColor font-semibold">
            Scissor.com
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setShowQRCodeModal(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <img src={QRCodeImageLink} alt="QR Code" />
          </div>
          <button
            className={`flex items-center gap-x-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
              isDownloading && 'cursor-not-allowed'
            }`}
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <FaDownload />
            {isDownloading ? 'Downloading...' : 'Download'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default GenerateQRCodeModal
