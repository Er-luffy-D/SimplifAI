'use client';
import React, { useRef, useEffect } from 'react';
import { Stage as KonvaStage } from 'konva/lib/Stage';
import { Stage, Layer, Group, Text } from 'react-konva';
import useMeasure from 'react-use-measure';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';
import { useRouter } from 'next/navigation';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { LuDownload } from 'react-icons/lu';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { useState } from 'react';
import {ParsedDocumentResponse} from '@/components/results-header';
// import * as ScrollArea from '@radix-ui/react-scroll-area';

interface Notes{
  title: string;
  content: string | string[];
}
export default function Resultslide({ parsedDocument }: { parsedDocument: ParsedDocumentResponse }) {
  const [ref, bounds] = useMeasure();
  const slideRef = useRef<KonvaStage | null>(null);
  const stageRef = useRef<(KonvaStage | null)[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [notesData, setNotesData] = React.useState<Notes[]>([]);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchData = async () => {
      const formData = new FormData();
      formData.append('fileId', parsedDocument.id);

      try {
        const res = await axios.post(`/api/slide-pdf`, formData);
        if (res.status !== 200) {
          setError('Failed to upload file. Please try again.');
          return;
        }
        let notes = res.data.slides.notes;
        setNotesData(notes);
      } catch (e) {
        console.error('❌ Upload failed:', e);
        setError(
          'Oops! Something went wrong while processing your file. Please try again.'
        );
      }
    };
    fetchData();
  }, []);
  
  
  const handleClick = async () => {
    setLoading(true);

    await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => setTimeout(resolve, 0));

    const pdf = new jsPDF('l', 'px', 'a4');
    stageRef.current.forEach((stage, index) => {
      if (stage) {
        const dataURL = stage.toDataURL({ pixelRatio: 3 });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        if (index !== 0) pdf.addPage();
        pdf.addImage(dataURL, 'PNG', 0, 0, pageWidth, pageHeight);
      }
    });
    pdf.save(parsedDocument.docName + '.pdf');
    setLoading(false);
  };


  return (
    <div className='flex'>
      <div className='w-[19vw] h-[100vh] flex flex-col border-r-1 !border-[#3B3B3B] opacity-100 bg-[#1D1E26] '>
        <div className=' h-[15vh] w-[19vw] p-[10px] flex flex-col border-b-1 !border-[#3B3B3B]'>
          <button
            onClick={() => router.back()}
            className='flex h-[5vh] items-center hover:text-blue-500'
          >
            <IoMdArrowRoundBack className='w-[24px] h-[20px] ml-[4px]' />
            <span className='pl-[4px] font-medium text-[14px]'>Back</span>
          </button>
          <div className='h-[10vh] flex  flex-col justify-between'>
            <div className='pl-[5px] pt-[5px] truncate font-medium h-[4vh] text-[14px] leading-[16px] items-center content-center'>
              {parsedDocument.docName}
            </div>
            <div>
              <Button
                variant='outline'
                size='sm'
                className='w-[18vw] font-medium text-[14px] leading-[16px] rounded-lg text-white hover:text-blue-500 !border-[#3B3B3B] !bg-transparent content-center'
                onClick={handleClick}
                data-cursor='hover'
                data-cursor-text='Export as PDF'
              >
                Export
                <LuDownload className='w-[16px] h-[16px]' />
              </Button>
            </div>
          </div>
        </div>
        {/* <ScrollArea.Root className='h-[85vh] w-[19vw]'>
          <ScrollArea.Viewport className='h-full w-full overflow-hidden overflow-y-auto'> */}
        <div className=' h-[85vh] min-h-0 w-[19vw] overflow-x-hidden overflow-y-auto scroll-smooth pl-[9px] pt-[12px] pr-[9px] '>
          {notesData.map((note, index) => (
            <div
              key={index}
              className='rounded-xl h-[20vh] w-[18vw] p-[8px] flex flex-row bg-inherit hover:bg-[#3E404A]'
            >
              <div className='h-[18.3vh] w-[0.9vw] pt-[4px] font-medium text-[12px] leading-[16px]'>
                {index + 1}
              </div>
              <div
                className='group p-3 bg-[#FFFFFF] h-[18.3vh] w-[16vw] rounded-xl cursor-pointer'
                onClick={() => setSelectedIndex(index)}
              >
                <h2 className='text-[5px] text-[#111184] font-bold text-center mt-[7px] mb-[5px]'>
                  {note.title}
                </h2>
                {Array.isArray(note.content) ? (
                  <ul className='list-disc pl-6 space-y-1'>
                    {note.content.map((item, i) => (
                      <li
                        key={i}
                        className='text-[5px] text-gray-700 text-left'
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='flex text-[5px] text-gray-700 whitespace-pre-wrap pl-[10px] text-justify'>
                    {note.content}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* </ScrollArea.Viewport> */}

        {/* <ScrollArea.Scrollbar
            className='flex w-2 bg-gray-900 rounded'
            orientation='vertical'
          >
            <ScrollArea.Thumb className='flex-1 relative bg-red-500 rounded' />
          </ScrollArea.Scrollbar> */}
        {/* </ScrollArea.Root> */}
      </div>
      <div className=' w-[81vw] h-[100vh] bg-[#000008]'>
        {/* {binaryTreeNotes.map((slide, index: number) => ( */}
        <div
          className='my-15 mx-7'
          ref={ref}
          style={{
            height: '88vh',
            width: '78vw',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Stage
            width={bounds.width}
            height={bounds.height}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '15px',
              margin: 'auto',
              pointerEvents: 'none',
            }}
            ref={slideRef}
          >
            <Layer>
              <Group>
                <Text
                  height={bounds.height}
                  width={bounds.width}
                  text={notesData[selectedIndex].title}
                  fontSize={40}
                  fontStyle='bold'
                  fill='#111184'
                  align='center'
                  verticalAlign='top'
                  letterSpacing={0}
                  padding={60}
                />
                {Array.isArray(notesData[selectedIndex].content) ? (
                  notesData[selectedIndex].content.map((item, i) => {
                    if (typeof item === 'string') {
                      return (
                        <Text
                          text={item}
                          key={i}
                          y={100 + i * 60}
                          fontSize={30}
                          lineHeight={1}
                          width={bounds.width}
                          height={bounds.height}
                          fill='grey'
                          align='left'
                          verticalAlign='top'
                          padding={70}
                        />
                      );
                    }
                    return '';
                  })
                ) : (
                  <Text
                    text={notesData[selectedIndex].content}
                    y={50}
                    fontSize={30}
                    width={bounds.width}
                    height={bounds.height}
                    fill='grey'
                    align='justify'
                    verticalAlign='top'
                    padding={100}
                    margin='auto'
                  />
                )}
              </Group>
            </Layer>
          </Stage>
        </div>
        <div
          style={{
            display: 'none',
          }}
        >
          {notesData.map((slide, index: number) => (
            <Stage
              width={bounds.width}
              height={bounds.height}
              key={index}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '15px',
                margin: 'auto',
              }}
              ref={(el) => {
                stageRef.current[index] = el;
              }}
            >
              <Layer>
                <Group>
                  <Text
                    height={bounds.height}
                    width={bounds.width}
                    text={slide.title}
                    fontSize={40}
                    fontStyle='bold'
                    fill='#111184'
                    align='center'
                    verticalAlign='top'
                    letterSpacing={0}
                    padding={60}
                  />
                  {Array.isArray(slide.content) ? (
                    slide.content.map((item, i) => {
                      if (typeof item === 'string') {
                        return (
                          <Text
                            text={item}
                            key={i}
                            y={100 + i * 60}
                            fontSize={30}
                            lineHeight={1}
                            width={bounds.width}
                            height={bounds.height}
                            fill='grey'
                            align='left'
                            verticalAlign='top'
                            padding={70}
                          />
                        );
                      }
                      return '';
                    })
                  ) : (
                    <Text
                      text={slide.content}
                      y={50}
                      fontSize={30}
                      width={bounds.width}
                      height={bounds.height}
                      fill='grey'
                      align='justify'
                      verticalAlign='top'
                      padding={100}
                      margin='auto'
                    />
                  )}
                </Group>
              </Layer>
            </Stage>
          ))}
        </div>
      </div>
      {loading && (
        <div className='fixed inset-0 bg-black/60'>
          <div
            className='h-[17vh] w-[20vw] bg-black rounded-lg flex items-start justify-center py-10'
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              backgroundColor: 'black',
              transform: 'translate(-50%,-50%)',
            }}
          >
            <ClipLoader size={40} color='white' />
            <p
              style={{
                position: 'absolute',
                top: '70%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                fontSize: '18px',
                fontWeight: 'medium',
                paddingTop: '10px',
              }}
            >
              Exporting Pdf
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
