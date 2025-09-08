import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Calculator, TrendingUp, DollarSign, Clock, Users, BarChart3 } from 'lucide-react';

interface ROICalculatorProps {
  title: string;
  description: string;
  category: string;
  canonicalPath?: string;
  fields: {
    id: string;
    label: string;
    type: 'number' | 'select';
    placeholder?: string;
    options?: { value: string; label: string; }[];
    defaultValue?: number | string;
    prefix?: string;
    suffix?: string;
  }[];
  calculations: {
    id: string;
    label: string;
    formula: (values: Record<string, number>) => number;
    format: 'currency' | 'percentage' | 'number' | 'months';
    description: string;
  }[];
  benefits: string[];
  caseStudies?: {
    company: string;
    industry: string;
    savings: string;
    timeframe: string;
  }[];
}

export default function ROICalculatorTemplate({
  title,
  description,
  category,
  canonicalPath,
  fields,
  calculations,
  benefits,
  caseStudies = []
}: ROICalculatorProps) {
  const [formValues, setFormValues] = useState<Record<string, number>>({});
  const [results, setResults] = useState<Record<string, number>>({});

  useEffect(() => {
    // Initialize form values with defaults
    const initialValues: Record<string, number> = {};
    fields.forEach(field => {
      if (field.defaultValue && typeof field.defaultValue === 'number') {
        initialValues[field.id] = field.defaultValue;
      }
    });
    setFormValues(initialValues);
  }, [fields]);

  useEffect(() => {
    // Calculate results when form values change
    const newResults: Record<string, number> = {};
    calculations.forEach(calc => {
      try {
        newResults[calc.id] = calc.formula(formValues);
      } catch (error) {
        newResults[calc.id] = 0;
      }
    });
    setResults(newResults);
  }, [formValues, calculations]);

  const handleInputChange = (fieldId: string, value: number) => {
    setFormValues(prev => ({ ...prev, [fieldId]: value }));
  };

  const formatResult = (value: number, format: string): string => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'months':
        return `${value.toFixed(1)} months`;
      default:
        return value.toLocaleString();
    }
  };

  return (
    <>
      <Head>
        <title>{title} | AI ROI Calculator | SiteOptz</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`${category} ROI calculator, AI ROI, return on investment, ${category} cost savings`} />
        {canonicalPath && (
          <link rel="canonical" href={`https://siteoptz.ai${canonicalPath}`} />
        )}
        
        {/* Open Graph */}
        <meta property="og:title" content={`${title} | AI ROI Calculator`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        {canonicalPath && (
          <meta property="og:url" content={`https://siteoptz.ai${canonicalPath}`} />
        )}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | AI ROI Calculator`} />
        <meta name="twitter:description" content={description} />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Calculator className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your ROI</h2>
              
              <div className="space-y-6">
                {fields.map(field => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                    </label>
                    {field.type === 'number' ? (
                      <div className="relative">
                        {field.prefix && (
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">{field.prefix}</span>
                          </div>
                        )}
                        <input
                          type="number"
                          className={`block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${field.prefix ? 'pl-8' : ''} ${field.suffix ? 'pr-12' : ''}`}
                          placeholder={field.placeholder}
                          value={formValues[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, parseFloat(e.target.value) || 0)}
                        />
                        {field.suffix && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">{field.suffix}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <select
                        className="block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={formValues[field.id] || field.options?.[0]?.value || ''}
                        onChange={(e) => handleInputChange(field.id, parseFloat(e.target.value) || 0)}
                      >
                        {field.options?.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your ROI Results</h2>
              
              <div className="space-y-4">
                {calculations.map(calc => (
                  <div key={calc.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{calc.label}</h3>
                      <div className="text-2xl font-bold text-blue-600">
                        {formatResult(results[calc.id] || 0, calc.format)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{calc.description}</p>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h3>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <TrendingUp className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Case Studies */}
          {caseStudies.length > 0 && (
            <div className="mt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
                <p className="text-xl text-gray-600">See how companies achieved real ROI with AI</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {caseStudies.map((study, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold text-gray-900">{study.company}</h3>
                        <p className="text-sm text-gray-600">{study.industry}</p>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="text-2xl font-bold text-green-600 mb-1">{study.savings}</div>
                      <div className="text-sm text-gray-600">in {study.timeframe}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}