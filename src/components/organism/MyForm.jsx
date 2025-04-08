
import { useFormik } from 'formik';
import * as Yup from 'yup';

const MyForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      company: "",
      budget: "",
      projectDetails: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("يجب إدخال الإسم"),
      email: Yup.string().email("إيميل غير صحيح").required("يجب إدخال الإيميل"),
      supject: Yup.string().required("أدخل عنوان للرسالة"),
      projectDetails: Yup.string().required("أضف بعض التفاصيل"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className=" mx-auto p-8 bg-white rounded">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block font-semibold text-my-color">
            الإسم
          </label>
          <input
            id="name"
            name="name"
            type="text"
            {...formik.getFieldProps("name")}
            className={`mt-1 block w-full px-3 py-2 border ${
              formik.touched.name && formik.errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="font-semibold text-my-color items-center gap-2">
            اللإيميل <p className='text-xs lg:text-sm'>(عليك ادخال ايميلك الصحيح حتى نستطيع الرد على هذه الرسالة)</p>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            {...formik.getFieldProps("email")}
            className={`mt-1 block w-full px-3 py-2 border ${
              formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="supject" className="block font-semibold text-my-color">
            عنوان الرسالة
          </label>
          <input
            id="supject"
            name="supject"
            type="text"
            {...formik.getFieldProps("supject")}
            className={`mt-1 block w-full px-3 py-2 border ${
              formik.touched.supject && formik.errors.supject ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {formik.touched.supject && formik.errors.supject ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.supject}</p>
          ) : null}
        </div>

      </div>

      <div className="mt-6">
        <label htmlFor="projectDetails" className="block font-semibold text-my-color">
          التفاصيل
        </label>
        <textarea
          id="projectDetails"
          name="projectDetails"
          {...formik.getFieldProps("projectDetails")}
          rows="4"
          className={`mt-1 block w-full px-3 py-2 border ${
            formik.touched.projectDetails && formik.errors.projectDetails ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
        />
        {formik.touched.projectDetails && formik.errors.projectDetails ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.projectDetails}</p>
          ) : null}
      </div>

      <button
        type="submit"
        className="mt-6 w-full text-lg font-bold py-2 px-4 bg-my-color text-white rounded-md shadow hover:bg-yellow-600 transition-all duration-300"
      >
        إرسال
      </button>
      <p className="text-center text-gray-500 text-sm mt-4">
          سوف يتم الرد على الرسائل خلال 24 ساعة
      </p>
    </form>
  );
};

export default MyForm;