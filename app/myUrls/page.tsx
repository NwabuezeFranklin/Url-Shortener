'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'
import useAxios from '@/utils/useAxios'
import MyURLsItem from '@/components/myURLsItem'
import ConfirmationModal from '@/components/confirmation-modal'
import GenerateQRCodeModal from '@/components/generate-qr-modal'
import before from '@/public/why/before.svg'
import EditLinkModal from '@/components/edit-link-modal'

interface MyURLDataProps {
  id: number
  count: number
  original_link: string
  shortened_link: string
}

const MyURLs = () => {
  const [myUrls, setMyUrls] = useState<MyURLDataProps[]>([])
  const [copiedLink, setCopiedLink] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showQRCodeModal, setShowQRCodeModal] = useState<boolean>(false)
  const [QRCodeImageLink, setQRCodeImageLink] = useState<string>('')
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Axios instance
  const api = useAxios()

  // Delete a Link
  const deleteLink = async (id: number) => {
    setIsLoading(true)
    const response = await api.delete(`/links/${id}/`)
    await response.data
    setIsLoading(false)
    setShowModal(false)
    toast.success('Link deleted successfully!', {})
  }

  // Copy a link to clipboard
  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link)
    setCopiedLink(link)
    toast.success('Link Copied!', {})
  }

  // Generate Unique QRcode
  const generateQRCode = async (url: string) => {
    try {
      const response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${url}`
      )
      const QRcode = await response.url
      setQRCodeImageLink(QRcode)
      toast.success('QR Code generated successfully!', {})
    } catch (error) {
      console.error(error)
      toast.error('Error generating QRcode', {})
    }
  }

  // List out all links that the user has shortened
  useEffect(() => {
    const getAllLinks = async () => {
      const response = await api.get('/links/')
      const data = await response.data
      setMyUrls(data)
    }

    getAllLinks()
  }, [isLoading])

  return (
    <div className="w-full flex flex-col min-h-[300px] px-4 sm:px-8 lg:px-[93px] lg:mt-[146px]">
      <div className="flex text-blackVariant mb-6 justify-center bg-white items-center lg:gap-x-4">
        <Image src={before} alt="" className="" />
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <p className="font-semibold text-primaryColor italic text-2xl lg:text-[40px]">
          My URLs
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="shorten text-white h-16 ">
            <tr>
              <th className="border-r-2">S/N</th>
              <th className="border-r-2">Original Link</th>
              <th className="border-r-2">Shortened Link</th>
              <th className="border-r-2">Clicks</th>
              <th className="px-4 border-r-2">
                Actions <br /> Customize, QRcode
              </th>
            </tr>
          </thead>
          <tbody className="mt-20">
            {myUrls.length < 1 && (
              <tr>
                <td colSpan={5} className="w-full p-4 text-xl text-center">
                  YOU HAVE NO LINKS YET
                </td>
              </tr>
            )}
            {myUrls.map((url, index) => (
              <React.Fragment key={url.id}>
                <MyURLsItem
                  url={url}
                  index={index}
                  setShowModal={setShowModal}
                  setShowQRCodeModal={setShowQRCodeModal}
                  setShowEditModal={setShowEditModal}
                  generateQRCode={generateQRCode}
                  copiedLink={copiedLink}
                  copyLink={copyLink}
                />
                <ConfirmationModal
                  showModal={showModal}
                  setShowModal={setShowModal}
                  deleteLink={deleteLink}
                  url={url}
                  isLoading={isLoading}
                />
                <GenerateQRCodeModal
                  showQRcodeModal={showQRCodeModal}
                  setShowQRCodeModal={setShowQRCodeModal}
                  QRCodeImageLink={QRCodeImageLink}
                />
                <EditLinkModal
                  url={url}
                  showEditModal={showEditModal}
                  setShowEditModal={setShowEditModal}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        @media (max-width: 767px) {
          .min-h-[300px] {
            margin-top: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default MyURLs
