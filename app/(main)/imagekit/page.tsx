import Image from "@/components/clients/imageKit/Image";

const Page = () => {
  return (
    <div className="p-16">
      <div className="flex flex-col gap-8">
        <Image
          path="/1.png"
          alt=""
          className="rounded-lg"
          width={300}
          height={300}
          loading="lazy"
          lqip={{ active: true, quality: 5, blur: 20 }}
        />
        <Image
          path="/2.png"
          alt=""
          className=" rounded-lg w-[320px] h-[250px] object-cover"
          width={300}
          height={300}
          loading="lazy"
          lqip={{ active: true, quality: 5, blur: 20 }}
        />
        <Image
          path="/3.png"
          alt=""
          className=" rounded-lg w-[320px] h-[250px] object-cover"
          width={300}
          height={300}
          loading="lazy"
          lqip={{ active: true, quality: 5, blur: 20 }}
        />
        <Image
          path="/4.png"
          alt=""
          className=" rounded-lg w-[320px] h-[250px] object-cover"
          width={300}
          height={300}
          loading="lazy"
          lqip={{ active: true, quality: 5, blur: 20 }}
        />
        <Image
          path="/default-image.jpg"
          alt=""
          className=" rounded-lg w-[320px] h-[250px] object-cover"
          width={300}
          height={300}
          loading="lazy"
          lqip={{ active: true, quality: 5, blur: 20 }}
        />
      </div>
    </div>
  );
};

export default Page;
