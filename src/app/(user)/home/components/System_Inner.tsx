'use client'
export default function FeaturesSection() {
    const features = [
        {
            title: "SC FAMILY",
            description: "SC family là ứng dụng điện thoại thông minh, cung cấp kênh tương tác chất lượng cao, bảo mật giữa nhà trường và PHHS.",
            icon: "🤝"
        },
        {
            title: "QUẢN LÝ HỌC SINH",
            description: "Giúp quản lý thông tin học sinh, theo dõi sức khỏe học sinh, cân đo, tiêm chủng và báo cáo số liệu.",
            icon: "👩‍🎓"
        },
        {
            title: "TÍNH LƯƠNG GIÁO VIÊN",
            description: "Lưu trữ thông tin giáo viên, cán bộ, chấm công, tính lương nhân sự, thiết lập báo cáo về nhân sự và quản lý lương.",
            icon: "👩‍🏫"
        },
        {
            title: "KHẨU PHẦN DINH DƯỠNG",
            description: "Hỗ trợ cân đối khẩu phần dinh dưỡng hàng ngày chính xác, khoa học, in các mẫu báo cáo số liệu dinh dưỡng.",
            icon: "🥗"
        },
        {
            title: "QUẢN LÝ THU CHI",
            description: "Lập phiếu thu một lớp chỉ từ 2-5 phút. Giúp theo dõi thu chi toàn trường, từng lớp, từng ngày một cách nhanh chóng và linh hoạt.",
            icon: "🧾"
        },
        {
            title: "BÁO CÁO PHÒNG GIÁO DỤC",
            description: "Theo dõi, báo cáo trực tiếp lên phòng giáo dục, quản lý dễ dàng, theo dõi nhanh chóng, tổng hợp số liệu chính xác.",
            icon: "📊"
        },
        {
            title: "TIN NHẮN",
            description: "Nhắn tin nhanh chóng, tiện lợi, thông báo trực tiếp tới PHHS, giáo viên, và cán bộ trong trường qua phần mềm.",
            icon: "📩"
        },
        {
            title: "THANH TOÁN HỌC PHÍ ONLINE",
            description: "Cung cấp kênh thanh toán học phí trực tuyến nhanh chóng, an toàn bằng các hình thức: chuyển khoản, ATM, Visa...",
            icon: "💳"
        }
    ];

    return (
        <div className="bg-sky-200 py-12 px-6 w-screen">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
                {features.map((item, index) => (
                    <div key={index} className="flex flex-col items-center p-4">
                        <div className="text-5xl mb-4">{item.icon}</div>
                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                        <hr className="w-56 border-t-2 border-amber-50 mb-2" />
                        <p className="text-sm text-gray-700">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
