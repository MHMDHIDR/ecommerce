import { Suspense } from 'react'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { LoadingPage } from '@/components/Loading'
import Layout from '@/components/Layout'

const PrivacyPolicy = () => {
  useDocumentTitle('سياسة الخصوصية')

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <section className='container px-5 mx-auto rtl mb-20'>
          <h1 className='font-bold text-xl text-center mb-10'>سياسة الخصوصية</h1>
          <div className='flex flex-col text-justify'>
            <div className='py-3 mt-5'>
              في https://mhmdhidr-ecommerce.vercel.app/ ، خصوصية زوارنا مهمة جدًا بالنسبة
              لنا. تحدد سياسة الخصوصية هذه أنواع المعلومات الشخصية التي يتلقاها ويجمعها
              موقعنا الإلكتروني وكيفية استخدامها.
            </div>

            <div className='py-3'>
              <h2 className='font-bold'>المعلومات التي نجمعها عندما تزور موقعنا:</h2>
              <ol>
                <li>
                  قد نجمع المعلومات الشخصية التي تقدمها طواعية ، مثل اسمك وعنوان بريدك
                  الإلكتروني ورقم هاتفك.
                </li>
                <li>
                  قد نقوم أيضًا بجمع معلومات غير شخصية ، مثل عنوان IP الخاص بك ونوع
                  المتصفح.
                </li>
              </ol>
            </div>
            <div className='py-3'>
              <h2 className='font-bold'>استخدام المعلومات</h2>
              <ol>
                <li>
                  نستخدم المعلومات الشخصية التي تقدمها لمعالجة الطلبات ، والتواصل معك بشأن
                  طلبك أو استفساراتك
                </li>
                <li>
                  ولإرسال رسائل بريد إلكتروني ترويجية بين الحين والآخر حول منتجاتنا
                  وخدماتنا.
                </li>
                <li>
                  لن نشارك معلوماتك الشخصية مع أي شركات أو أفراد تابعين لجهات خارجية ،
                  باستثناء ما يقتضيه القانون
                </li>
              </ol>
            </div>
            <p className='py-3'>
              نحن نستخدم معلومات غير شخصية ، مثل عنوان IP الخاص بك ونوع المتصفح ، لتحسين
              تصميم ومحتوى موقعنا ، ولتحليل استخدام الموقع.
            </p>
            <div className='py-3'>
              <h2 className='font-bold'>الكوكيز</h2>
              <ol>
                <li>
                  قد نستخدم ملفات تعريف الارتباط لتخزين معلومات حول تفضيلاتك ولتخصيص
                  تجربتك على موقعنا
                </li>
                <li>
                  ملفات تعريف الارتباط هي ملفات بيانات صغيرة يتم تخزينها على جهازك عندما
                  تزور موقعنا على الإنترنت.
                </li>
                <li>
                  يمكنك تعطيل ملفات تعريف الارتباط في إعدادات المتصفح الخاص بك ، ولكن هذا
                  قد يؤثر على قدرتك على استخدام بعض ميزات موقعنا
                </li>
              </ol>
            </div>
            <div className='py-3'>
              <h2 className='font-bold'>التغييرات على سياسة الخصوصية</h2>
              <p>
                قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. عليك مراجعة اي تعديلات يتم
                نشرها على سياسة الخصوصية هذه على موقعنا
              </p>
            </div>
            <p className='py-3'>
              اتصل بنا إذا كانت لديك أي أسئلة أو مخاوف بشأن سياسة الخصوصية الخاصة بنا ،
              فيرجى الاتصال بنا على contact@mhmdhidr-ecommerce.vercel.app.
            </p>
          </div>
        </section>
      </Layout>
    </Suspense>
  )
}

export default PrivacyPolicy
