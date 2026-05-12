import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ChevronRight, 
  RotateCcw, 
  Shield, 
  Cpu, 
  FlaskConical, 
  Wrench, 
  UserCircle,
  Terminal,
  Orbit
} from 'lucide-react';

const STORY_DATA = {
  start: {
    text: "Uyandırma protokolü tamamlandı. 'Sonsuzluk Yankısı' gemisi bilinmeyen bir galaksinin eşiğinde duruyor. Mürettebatın geri kalanı hala kriyojenik uykuda, ancak geminin 4 kritik istasyonundan alarm geliyor. Hangi uzmanı önce uyandırıp komutayı ona devretmek istersin?",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1200",
    charName: "Sistem Mesajı",
    options: [
      { text: "Kaptan Kaan (Strateji ve Komuta)", nextNode: "kaan_path", char: "Kaan" },
      { text: "Mühendis Elif (Sistem ve Onarım)", nextNode: "elif_path", char: "Elif" },
      { text: "Güvenlik Amiri Demir (Savunma)", nextNode: "demir_path", char: "Demir" },
      { text: "Dr. Selin (Anomali Analizi)", nextNode: "selin_path", char: "Selin" }
    ]
  },
  
  // KAAN'IN YOLU
  kaan_path: {
    text: "Kaptan Kaan uyandı. 'Kaptan koltuğuna oturmak güzel,' diyor sakince. 'Dışarıdaki anomali sıradan bir nebula değil, bir geçit. Tüm mürettebatın uyanmasını bekleyemeyiz. Hemen atılmalı mıyız?'",
    image: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=1200",
    charName: "Kaptan Kaan",
    options: [
      { text: "Tam güç ileri, geçide gir!", nextNode: "gate_ending" },
      { text: "ECHO'yu devreye sok ve risk analizi yap", nextNode: "echo_analysis" }
    ]
  },

  // ELİF'İN YOLU
  elif_path: {
    text: "Elif elinde bir İngiliz anahtarıyla kriyotüpten çıkıyor. 'Gemi sarsılıyor kaptan! Reaktör çekirdeği mor enerjiyle doluyor. Eğer hemen müdahale etmezsem gemi parçalanacak!'",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200",
    charName: "Mühendis Elif",
    options: [
      { text: "Reaktörü manuel olarak boşalt", nextNode: "reactor_failure" },
      { text: "Enerjiyi kalkanlara aktar", nextNode: "shield_success" }
    ]
  },

  // DEMİR'İN YOLU
  demir_path: {
    text: "Demir silahını kontrol ederek uyanıyor. 'Radarda gemiye sızmaya çalışan bir şeyler görüyorum. Organik değiller. Güvenlik protokolü 9'u başlatmamı ister misin?'",
    image: "https://images.unsplash.com/photo-1555679427-1f6dfcce943b?auto=format&fit=crop&q=80&w=1200",
    charName: "Güvenlik Amiri Demir",
    options: [
      { text: "Dış kapıları mühürle ve savun", nextNode: "defense_win" },
      { text: "Hava kilitlerini aç ve onları vakuma çek", nextNode: "vacuum_risk" }
    ]
  },

  // SELİN'İN YOLU
  selin_path: {
    text: "Dr. Selin ekranlara bakarken gözleri parlıyor. 'Bu sinyal... Bu bir dil! Kadimler bizimle iletişim kurmaya çalışıyor. Eğer frekansı eşleyebilirsem galaksinin haritasına ulaşabiliriz.'",
    image: "https://images.unsplash.com/photo-1532634896-26909d0d4b89?auto=format&fit=crop&q=80&w=1200",
    charName: "Dr. Selin",
    options: [
      { text: "Zihnini sinyale bağla (Riskli)", nextNode: "ascension_ending" },
      { text: "Sinyali gemi bilgisayarına indir", nextNode: "data_success" }
    ]
  },

  // ECHO (Yapay Zeka)
  echo_analysis: {
    text: "ECHO'nun hologramı beliriyor: 'Kaptan Kaan, geçit stabil değil. Ancak Dr. Selin'in verileriyle birleşirse güvenli bir rota oluşturabilirim. Onu uyandırmalıyız.'",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200",
    charName: "Yapay Zeka ECHO",
    options: [
      { text: "Ekibi birleştir ve senkronize ol", nextNode: "unity_ending" }
    ]
  },

  // SONLAR
  gate_ending: {
    text: "Geçide hazırlıksız girdiniz. Gemi atomlarına ayrıldı ama bilinciniz evrene yayıldı. Artık yıldızların kendisisiniz.",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1200",
    charName: "Kader",
    type: "neutral",
    text_end: "Fiziksel formunuz yok oldu ama sonsuzluğa ulaştınız.",
    options: []
  },
  unity_ending: {
    text: "Kaan'ın cesareti, Elif'in teknik becerisi, Selin'in bilgisi ve ECHO'nun hızı birleşti. İnsanlık için yeni bir galaksi keşfettiniz!",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    charName: "Mutlu Son",
    type: "win",
    text_end: "Mükemmel bir ekip çalışmasıyla galaksiyi fethettiniz.",
    options: []
  },
  reactor_failure: {
    text: "Reaktör patladı. Elif'in son çığlığı telsizde yankılandı. Gemi karanlığa gömüldü.",
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bcc0?auto=format&fit=crop&q=80&w=1200",
    charName: "Felaket",
    type: "lose",
    text_end: "Görev başarısız. Gemi enkazı bir nebulaya dönüştü.",
    options: []
  }
};

const getCharIcon = (name) => {
  switch(name) {
    case 'Kaptan Kaan': return <UserCircle className="text-blue-400" />;
    case 'Mühendis Elif': return <Wrench className="text-orange-400" />;
    case 'Güvenlik Amiri Demir': return <Shield className="text-red-400" />;
    case 'Dr. Selin': return <FlaskConical className="text-purple-400" />;
    case 'Yapay Zeka ECHO': return <Cpu className="text-cyan-400" />;
    default: return <Terminal className="text-slate-400" />;
  }
};

export default function SpaceAdventureApp() {
  const [currentNode, setCurrentNode] = useState('start');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const node = STORY_DATA[currentNode];

  const handleOption = (nextNode) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentNode(nextNode);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  const resetGame = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentNode('start');
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-200 font-sans p-4 md:p-8 selection:bg-cyan-500/30">
      {}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 blur-[150px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-white/10 pb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
              <Orbit className="text-cyan-400 animate-spin-slow" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">Sonsuzluk Yankısı</h1>
              <p className="text-[10px] text-cyan-500/70 font-mono tracking-widest uppercase">Mürettebat Yönetim Sistemi v2.0</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            {['Kaan', 'Elif', 'Demir', 'Selin', 'ECHO'].map((name) => (
              <div key={name} className="group relative">
                <div className="w-10 h-10 rounded-full border border-white/20 bg-black flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-help overflow-hidden">
                   <div className="text-[10px] font-bold">{name[0]}</div>
                </div>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </header>

        {/* Main Interface */}
        <main className={`transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          {/* Visual Scene */}
          <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl mb-8 group">
            <img 
              src={node.image} 
              alt="Scene" 
              className="w-full h-[400px] object-cover transition-transform duration-[10s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-black/30" />
            
            {/* Character Badge */}
            <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-black/60 backdrop-blur-xl border border-white/20 px-5 py-3 rounded-2xl">
              {getCharIcon(node.charName)}
              <div>
                <span className="block text-[10px] text-slate-400 uppercase tracking-tighter font-bold">Aktif Karakter</span>
                <span className="text-sm font-bold text-white tracking-wide">{node.charName}</span>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[2rem] backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Terminal size={100} />
                </div>
                <p className="text-xl md:text-2xl leading-relaxed font-light text-slate-100 italic relative z-10">
                  "{node.text}"
                </p>
                
                {node.type && (
                  <div className={`mt-8 p-6 rounded-2xl border ${
                    node.type === 'win' ? 'bg-green-500/10 border-green-500/50' : 
                    node.type === 'lose' ? 'bg-red-500/10 border-red-500/50' : 
                    'bg-cyan-500/10 border-cyan-500/50'
                  }`}>
                    <h3 className="text-lg font-bold uppercase mb-1">{node.type === 'win' ? 'Görev Başarılı' : 'Sonuç'}</h3>
                    <p className="text-sm text-slate-300 font-mono italic">{node.text_end}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Options List */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 ml-2">Karar Ver</h4>
              {node.options.length > 0 ? (
                node.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOption(option.nextNode)}
                    className="group w-full flex items-center justify-between p-5 bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/50 rounded-2xl transition-all duration-300 active:scale-95 text-left"
                  >
                    <span className="text-sm font-medium pr-4 group-hover:translate-x-2 transition-transform">{option.text}</span>
                    <ChevronRight size={18} className="text-slate-600 group-hover:text-cyan-400" />
                  </button>
                ))
              ) : (
                <button
                  onClick={resetGame}
                  className="w-full flex items-center justify-center gap-3 p-5 bg-cyan-500 text-black font-black rounded-2xl hover:bg-cyan-400 transition-all active:scale-95 uppercase tracking-widest text-sm"
                >
                  <RotateCcw size={20} /> Yeniden Başlat
                </button>
              )}
            </div>
          </div>
        </main>

        {/* Footer Info */}
        <footer className="mt-20 border-t border-white/5 pt-8 flex flex-wrap justify-between gap-4 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" /> Sinyal Gücü: %98</div>
          <div className="flex items-center gap-4">
            <span>Sektör: Uncharted-8</span>
            <span>Derinlik: 4.2 L.Y.</span>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        body {
          background-color: #050508;
          color: white;
          overflow-x: hidden;
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #050508;
        }
        ::-webkit-scrollbar-thumb {
          background: #1e1e26;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}