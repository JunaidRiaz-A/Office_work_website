import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomepageMerge from "./Components/Homepage/HomepageMerge/HomepageMerge";
import AboutusMerge from "./Components/AboutusPage/AboutusMerge/AboutusMerge";
import JobPostDetail from "./Components/JobPostDetailPage/JobPostDetail";
import OurTeamMerge from "./Components/OurteamPage/OurTeamMerge/OurTeamMerge";
import ApplyNowPageMerge from "./Components/ApplyNowPage/ApplyNowPageMerge/ApplyNowPageMerge";
import PortfolioPageMerge from "./Components/PortfolioPage/PortfolioPageMerge/PortfolioPageMerge";
import PortFolioDetail from "./Components/PortfolioDetail/PortfolioDetail";
import AWSdetailMerge from "./Components/AWSdetailPage/AWSdetailMerge/AWSdetailMerge";
import CaseStudiesMerge from "./Components/CaseStudiesPage/CaseStudiesMerge/CaseStudiesMerge";
import CaseStudyDetailMerge from "./Components/CaseStudyDetailPage/CaseStudyDetailMerge/CaseStudyDetailMerge";
import BlogsMerge from "./Components/Blogs/BlogsMerge/BlogsMerge";
import BlogsDetailmerge from "./Components/BlogsDetailPage/BlogsDetailmerge/BlogsDetailmerge";
import SignInPage from "./Components/SignInPage/SignInPage";
import Dashboard from "./Components/Sign/Dashboard";
import PostOpen from "./Components/Sign/PostOpen";
import Category from "./Components/Sign/Category";
import Tags from "./Components/Sign/Tags";
import SignIn from "./Components/Sign/SignIn";
import Faqs from "./Components/Homepage/Faqs/Faqs";
import WebsiteDeploymentServicesMerge from "./Components/WebsiteDeploymentServices/WebsiteDeploymentServicesMerge/WebsiteDeploymentServicesMerge";
import MobileDevelopmentServiceMerge from "./Components/MobileDevelopementService/MobileDevelopementServiceMerge/MobileDevelopementServiceMerge";
import AISolutionsServicesMerge from "./Components/WebsiteDeploymentServices/AISolutionsServicesMerge/AISolutionsServicesMerge";
import Tips from "./Components/Homepage/Tips/Tips";
import TipDetailMerge from "./Components/Homepage/Tips/TipDetailMerge";
import AddJobPost from "./Components/Dashboard/AddJobPost/AddJobPost";
import AddTeamMember from "./Components/Dashboard/AddTeamMember/AddTeamMember";
import AddEventGallery from "./Components/Dashboard/AddEventGallery/AddEventGallery";
import AddCaseStudy from "./Components/Dashboard/AddCaseStudy/AddCaseStudy";
import AddPortfolio from "./Components/Dashboard/AddPortfolio/AddPortfolio";
import ResumeReceived from "./Components/Dashboard/ResumeReceived/ResumeReceived";
import AddTestimonial from "./Components/Dashboard/AddTestimonial/AddTestimonial";
import AddTips from "./Components/Dashboard/AddTips/AddTips";
import ProductDesignMerge from "./Components/ProductDesignServices/ProductDesignMerge";
import Appointment from "./Components/Homepage/Appointment/Appointment";
import OurServicesMerge from "./Components/our services/OurServicesMerge";
import DigitalCommerceServicesMerge from "./Components/DigitalCommerceSolution/DigitalCommerceServicesMerge";
import CRMPlatformServicesMerge from "./Components/CRMPlatformSolution/CRMPlatformServicesMerge";
import GenerativeAIServicesMerge from "./Components/GenerativeAISolution/GenerativeAIServicesMerge";
import MachineLearningServicesMerge from "./Components/MachineLearningSolution/MachineLearningServicesMerge";
import SoftwareEngineeringServicesMerge from "./Components/SoftwareEngineeringSolution/SoftwareEngineeringServicesMerge";
import CloudEngineeringServicesMerge from "./Components/CloudEngineeringSolution/CloudEngineeringServicesMerge";
import DataEngineeringServicesMerge from "./Components/DataEngineeringSolution/DataEngineeringServicesMerge";
import RPAIPAServicesMerge from "./Components/RPAIPASolution/RPAIPAServicesMerge";
import ProductStrategyConsultingServicesMerge from "./Components/ProductStrategyConsultingSolution/ProductStrategyConsultingServicesMerge";
import GraphicsDesigningServicesMerge from "./Components/GraphicsDesigningSolution/GraphicsDesigningServicesMerge";
import SystemIntegrationServicesMerge from "./Components/SystemIntegrationSolution/SystemIntegrationServicesMerge";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import AppointmentsReceived from "./Components/AppointmentsReceived/AppointmentsReceived";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<HomepageMerge />} />
        <Route path="/aboutus" element={<AboutusMerge />} />
        <Route path="/services" element={<OurServicesMerge />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/job/description" element={<JobPostDetail />} />
        <Route path="/team" element={<OurTeamMerge />} />
        <Route path="/applynow" element={<ApplyNowPageMerge />} />
        <Route path="/appointment" element={<Appointment />} />

        {/* Portfolio Routes */}
        <Route path="/portfolio" element={<PortfolioPageMerge />} />
        <Route path="/portfolio/detail/:id/:title" element={<PortFolioDetail />} />
        <Route path="/dashboard/add-portfolio" element={<AddPortfolio />} />

        {/* Services Routes */}
        <Route path="/aws" element={<AWSdetailMerge />} />
        <Route path="/custom-software-development" element={<WebsiteDeploymentServicesMerge />} />
        <Route path="/digital-commerce" element={<DigitalCommerceServicesMerge />} />
        <Route path="/crm-platform-implementation" element={<CRMPlatformServicesMerge />} />
        <Route path="/generative-ai" element={<GenerativeAIServicesMerge />} />
        <Route path="/machine-learning" element={<MachineLearningServicesMerge />} />
        <Route path="/software-engineering" element={<SoftwareEngineeringServicesMerge />} />
        <Route path="/cloud-engineering" element={<CloudEngineeringServicesMerge />} />
        <Route path="/data-engineering" element={<DataEngineeringServicesMerge />} />
        <Route path="/rpa-ipa-implementation" element={<RPAIPAServicesMerge />} />
        <Route path="/product-strategy-consulting" element={<ProductStrategyConsultingServicesMerge />} />
        <Route path="/graphics-designing" element={<GraphicsDesigningServicesMerge />} />
        <Route path="/system-integration" element={<SystemIntegrationServicesMerge />} />
        <Route path="/mobile/app/developement" element={<MobileDevelopmentServiceMerge />} />
        <Route path="/ai/solutions" element={<AISolutionsServicesMerge />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/product-design" element={<ProductDesignMerge />} />

        {/* Case Studies Routes */}
        <Route path="/case/studies" element={<CaseStudiesMerge />} />
        <Route path="/case/study/detail/:id/:title" element={<CaseStudyDetailMerge />} />

        {/* Blog and Tips Routes */}
        <Route path="/tips" element={<Tips />} />
        <Route path="/tips/:id/:title" element={<TipDetailMerge />} />
        <Route path="/blogs" element={<BlogsMerge />} />
        <Route path="/blog/detail/:postId/:title" element={<BlogsDetailmerge />} />
        <Route path="/blogs/:id/:title" element={<PostOpen />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/tags/:id" element={<Tags />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<SignInPage />} />
        <Route path="/admin-sign-in" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/add-job-post" element={<AddJobPost />} />
        <Route path="/dashboard/add-team-member" element={<AddTeamMember />} />
        <Route path="/dashboard/add-event-gallery" element={<AddEventGallery />} />
        <Route path="/dashboard/add-case-study" element={<AddCaseStudy />} />
        <Route path="/dashboard/add-testimonial" element={<AddTestimonial />} />
        <Route path="/dashboard/add-tips" element={<AddTips />} />
        <Route path="/dashboard/resume-received" element={<ResumeReceived />} />
        <Route path="/dashboard/appointments-received" element={<AppointmentsReceived />} />

        {/* Catch-all Route to redirect to homepage */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;