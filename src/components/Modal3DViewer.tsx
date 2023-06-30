// import { CHAIN } from "config";
// import { useWeb3Context } from "hooks/useWeb3Context";
import React, { FC, Fragment, Suspense, useEffect, useRef } from "react";
// import { GLTFModel } from "react-3d-viewer";
// import { toast } from "react-hot-toast";
// import { useParams } from "react-router-dom";
// import ButtonPrimary from "shared/Button/ButtonPrimary";
// import ButtonSecondary from "shared/Button/ButtonSecondary";
// import Input from "shared/Input/Input";
// import NcModal from "shared/NcModal/NcModal";
// import { callList } from "utils/calls";
import { Canvas, useLoader } from "react-three-fiber";
import { OrbitControls, useGLTF, useProgress, Html, Center, Environment } from "@react-three/drei";
// import { get3durl } from "config/nfts";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import { Transition } from "@headlessui/react";
import { isMobile } from "react-device-detect"

export interface Modal3DViewerProps {
  show: boolean;
  id: number;
  onCloseModal3DViewer: () => void;
}

function Model(props: any) {
  const { scene } = useGLTF("/test.glb");
  // const { scene } = useGLTF(get3durl(props.id));
  return <primitive object={scene} position={[0, -0.8, 0]} />;
}

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress.toFixed(2)}% loaded</Html>
}

const Modal3DViewer: FC<Modal3DViewerProps> = ({ show, id, onCloseModal3DViewer }) => {
  console.log("sniper: ismobile: ", isMobile)
  const renderContent = () => {
    return (
      <Canvas 
        // dpr={[1, 2]} 
        camera={{ zoom: 2.5 }}
        >
        <Environment preset="forest" />
        <ambientLight intensity={1}/>
        <Suspense fallback={<Loader/>}>
          <Model id={id} />
        </Suspense>
        <OrbitControls/>
      </Canvas>
    );
  };

  return (
    // <NcModal
    //   isOpenProp={show}
    //   onCloseModal={onCloseModal3DViewer}
    //   contentExtraClass="max-w-[800px] w-[90%] h-[90vh]"
    //   contentPaddingClass="h-[95%]"
    //   renderContent={renderContent}
    //   renderTrigger={renderTrigger}
    //   modalTitle=""
    // />
    <Transition appear show={show} as={Fragment}>
      <div className={`fixed flex justify-center items-center bg-transparent w-[100vw] h-[100vh] bottom-0 left-0 z-50`}>
        <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-75"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-75"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
          <div
            className={`inline-block w-full my-5 overflow-hidden text-left align-middle transition-all transform bg-white border border-black border-opacity-5 shadow-xl rounded-2xl sm:my-8 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-900 dark:text-neutral-300 max-w-[800px] w-[90%] h-[90vh]`}
          >
            <div className="py-4 px-6 text-center relative border-b border-neutral-100 dark:border-neutral-700 md:py-5">
              <ButtonClose
                onClick={onCloseModal3DViewer}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 sm:left-4"
              />
            </div>
            {isMobile? <p>3D Model View is available on Desktop</p> : <div className={`h-[95%]`}>{renderContent()}</div>}
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default Modal3DViewer;
